import React, { useMemo, useState, useEffect } from 'react';
import api from '../../utils/axios';
import { toast } from 'sonner';

const formatDate = (d) =>
  new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
const formatTime = (d) =>
  new Date(d).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

const aqiLabel = (value) => {
  const v = Number(value);
  if (!Number.isFinite(v)) return 'Unknown';
  if (v <= 50) return 'Good';
  if (v <= 100) return 'Moderate';
  if (v <= 150) return 'Unhealthy (Sensitive)';
  if (v <= 200) return 'Unhealthy';
  if (v <= 300) return 'Very Unhealthy';
  return 'Hazardous';
};

const toUiRecord = (h) => {
  const createdAt = h?.createdAt || Date.now();
  const weather = h?.environment?.weather || {};
  const aqiVal = h?.environment?.aqi;
  const result = h?.result || {};

  return {
    id: h?._id || h?.id || String(createdAt),
    date: formatDate(createdAt),
    time: formatTime(createdAt),
    weather: {
      temp: weather?.temp ?? weather?.temperature ?? 0,
      humidity: weather?.humidity ?? 0,
      uvi: weather?.uvi ?? weather?.uvIndex ?? 0,
      condition: weather?.condition || 'Clear',
      description: weather?.description || '',
    },
    aqi: {
      value: typeof aqiVal === 'number' ? aqiVal : Number(aqiVal ?? 0),
      label: aqiLabel(aqiVal),
    },
    recommendations: {
      ingredients: (result?.ingredients || []).map((i) => i?.name).filter(Boolean),
      avoid: (result?.avoid || []).map((i) => i?.name).filter(Boolean),
      remedies: (result?.homeRemedies || []).map((r) => r?.name).filter(Boolean),
      productTypes: [result?.productType].filter(Boolean),
    },
    // for history view
    skinType: h?.input?.skinType,
    budget: h?.input?.budget,
    concerns: h?.input?.concerns || [],
    location: h?.input?.location,
    gender: h?.input?.gender,
    category: h?.input?.category,
    raw: h,
  };
};

const MyAnalysis = () => {
  const [analysisData, setAnalysisData] = useState(null);
  const [history, setHistory] = useState([]);
  const [viewMode, setViewMode] = useState('current'); // 'current' or 'history'
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true);
        const res = await api.get('/api/recommendation/analyze-history');
        const data = res?.data?.data || [];
        const ui = data.map(toUiRecord);
        setHistory(ui);
        setAnalysisData(ui[0] || null);
      } catch (e) {
        toast.error(e?.response?.data?.message || 'Failed to load analysis history');
        setHistory([]);
        setAnalysisData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  const current = analysisData;
  const weather = current?.weather;
  const aqi = current?.aqi;
  const recommendations = current?.recommendations;
  const date = current?.date;
  const time = current?.time;

  const hasCurrent = useMemo(
    () => Boolean(weather && aqi && recommendations && date && time),
    [weather, aqi, recommendations, date, time]
  );

  const switchToHistory = () => setViewMode('history');
  const switchToCurrent = () => setViewMode('current');

  // Render Current Analysis View
  const renderCurrentAnalysis = () => (
    <>
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <span className="bg-primary/20 p-2 rounded-full">🔬</span>
          Skin Analysis
        </h1>
        <p className="text-primary-light text-sm mt-1">
          {date} at {time}
        </p>
      </div>

      {/* Weather & AQI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div className="bg-white/30 backdrop-blur-md rounded-xl p-5 shadow-md border border-white/40">
          <div className="flex items-center gap-3">
            <span className="text-4xl">
              {weather.condition === 'Clear' ? '☀️' : weather.condition === 'Clouds' ? '☁️' : '🌥️'}
            </span>
            <div>
              <p className="text-2xl font-bold text-gray-800">{Math.round(weather.temp)}°C</p>
              <p className="text-sm text-primary-light capitalize">{weather.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 mt-4">
            <div>
              <p className="text-xs text-gray-500">Humidity</p>
              <p className="font-semibold text-primary text-lg">{weather.humidity}%</p>
            </div>
            <div>
              <p className="text-xs text-gray-500">UV Index</p>
              <p className="font-semibold text-primary text-lg">{weather.uvi}</p>
            </div>
          </div>
        </div>

        <div className="bg-white/30 backdrop-blur-md rounded-xl p-5 shadow-md border border-white/40">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🌫️</span>
            <div>
              <p className="text-2xl font-bold text-gray-800">AQI {aqi.value}</p>
              <p className="text-sm text-primary-light">{aqi.label}</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full h-2.5 bg-gray-200/50 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${
                  aqi.value === 1 ? 'bg-green-500' :
                  aqi.value === 2 ? 'bg-yellow-500' :
                  aqi.value === 3 ? 'bg-orange-500' :
                  aqi.value === 4 ? 'bg-red-500' : 'bg-purple-500'
                }`}
                style={{ width: `${(aqi.value / 5) * 100}%` }}
              />
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>Good</span>
              <span>Hazardous</span>
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/30 backdrop-blur-md rounded-xl p-5 shadow-md border border-white/40">
          <h3 className="text-base font-bold text-primary mb-3 flex items-center gap-2">
            <span>✨</span> Key Ingredients
          </h3>
          <div className="flex flex-wrap gap-2">
            {recommendations.ingredients.map((item, i) => (
              <span key={i} className="bg-primary/15 text-primary px-3 py-1.5 rounded-full text-xs font-medium">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white/30 backdrop-blur-md rounded-xl p-5 shadow-md border border-white/40">
          <h3 className="text-base font-bold text-primary mb-3 flex items-center gap-2">
            <span>⚠️</span> Avoid
          </h3>
          <div className="flex flex-wrap gap-2">
            {recommendations.avoid.map((item, i) => (
              <span key={i} className="bg-red-100/60 text-red-600 px-3 py-1.5 rounded-full text-xs font-medium border border-red-200">
                {item}
              </span>
            ))}
          </div>
        </div>

        <div className="bg-white/30 backdrop-blur-md rounded-xl p-5 shadow-md border border-white/40">
          <h3 className="text-base font-bold text-primary mb-3 flex items-center gap-2">
            <span>🌿</span> Home Remedies
          </h3>
          <ul className="space-y-2">
            {recommendations.remedies.map((item, i) => (
              <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-primary">•</span> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-white/30 backdrop-blur-md rounded-xl p-5 shadow-md border border-white/40">
          <h3 className="text-base font-bold text-primary mb-3 flex items-center gap-2">
            <span>🛍️</span> Look For
          </h3>
          <div className="flex flex-wrap gap-2">
            {recommendations.productTypes.map((item, i) => (
              <span key={i} className="bg-primary/10 text-primary px-3 py-1.5 rounded-full text-xs font-medium border border-primary/20">
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* View History Button - At Bottom */}
      <div className="mt-8 flex justify-center">
        <button
          onClick={switchToHistory}
          className="bg-white/60 backdrop-blur-sm text-primary px-6 py-3 rounded-xl shadow-md border border-primary-dull/40 hover:shadow-lg transition-all flex items-center gap-2"
        >
          <span>📋 View History</span>
          {history.length > 0 && (
            <span className="bg-primary text-white text-xs px-2 py-0.5 rounded-full">{history.length}</span>
          )}
        </button>
      </div>
    </>
  );

  // Render History View
  const renderHistoryView = () => (
    <>
      <div className="mb-6 flex items-center gap-4">
        <button
          onClick={switchToCurrent}
          className="bg-white/60 backdrop-blur-sm text-primary px-4 py-2 rounded-xl shadow-md border border-primary-dull/40 hover:shadow-lg transition-all flex items-center gap-2"
        >
          ← Back to Current
        </button>
        <h1 className="text-3xl font-bold text-primary flex items-center gap-2">
          <span className="bg-primary/20 p-2 rounded-full">📅</span>
          Analysis History
        </h1>
      </div>

      {history.length === 0 ? (
        <div className="bg-white/30 backdrop-blur-md rounded-xl p-8 text-center">
          <p className="text-gray-500 italic">No history yet. Update your profile to record analysis.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {history.map((record) => (
            <div
              key={record.id}
              className="bg-white/40 backdrop-blur-md rounded-xl p-5 shadow-md border border-white/40"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <span className="text-lg font-semibold text-primary">
                  {record.date} at {record.time}
                </span>
                <div className="flex gap-2">
                  <span className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                    Skin: {record.skinType || 'N/A'}
                  </span>
                  {record.category && (
                    <span className="text-xs bg-primary-dull/30 text-primary px-3 py-1 rounded-full">
                      {record.category}
                    </span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm mb-3">
                <div><span className="text-gray-600">Budget:</span> ₹{record.budget || '—'}</div>
                <div><span className="text-gray-600">Location:</span> {record.location || '—'}</div>
                <div><span className="text-gray-600">Gender:</span> {record.gender || '—'}</div>
                <div><span className="text-gray-600">Concerns:</span> {record.concerns?.length || 0}</div>
              </div>

              {record.weather && (
                <div className="flex flex-wrap gap-4 text-sm bg-white/20 p-3 rounded-lg">
                  <span className="flex items-center gap-1">🌡️ {Math.round(record.weather.temp)}°C</span>
                  <span className="flex items-center gap-1">💧 {record.weather.humidity}%</span>
                  <span className="flex items-center gap-1">☀️ UV {record.weather.uvi}</span>
                  {record.aqi && (
                    <span className="flex items-center gap-1">🌫️ AQI {record.aqi.value} ({record.aqi.label})</span>
                  )}
                </div>
              )}

              {record.recommendations && (
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-xs font-medium text-primary">✨ Key Ingredients:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {record.recommendations.ingredients.map((ing, i) => (
                        <span key={i} className="bg-primary/10 text-primary text-xs px-2 py-0.5 rounded-full">{ing}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-primary">⚠️ Avoid:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {record.recommendations.avoid.map((item, i) => (
                        <span key={i} className="bg-red-100/60 text-red-600 text-xs px-2 py-0.5 rounded-full">{item}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );

  return (
    <div className="relative min-h-full overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dull/20 via-white/10 to-primary-light/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-4 py-5 sm:py-6">
        {loading ? (
          <div className="bg-white/30 backdrop-blur-md rounded-xl p-8 text-center">
            <p className="text-gray-600">Loading…</p>
          </div>
        ) : viewMode === 'current' ? (
          hasCurrent ? (
            renderCurrentAnalysis()
          ) : (
            <div className="bg-white/30 backdrop-blur-md rounded-xl p-8 text-center">
              <p className="text-gray-500 italic">
                No analysis yet. Run an analysis to see results here.
              </p>
            </div>
          )
        ) : (
          renderHistoryView()
        )}
      </div>
    </div>
  );
};

export default MyAnalysis;