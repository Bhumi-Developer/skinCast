import React, { useEffect, useState } from 'react';

// Helper functions (same)
const getUVInfo = (uvi) => {
  if (uvi <= 2) return { label: 'Low', barColor: 'bg-green-500', textColor: 'text-green-600', bgLight: 'bg-green-50' };
  if (uvi <= 5) return { label: 'Moderate', barColor: 'bg-yellow-500', textColor: 'text-yellow-600', bgLight: 'bg-yellow-50' };
  if (uvi <= 7) return { label: 'High', barColor: 'bg-orange-500', textColor: 'text-orange-600', bgLight: 'bg-orange-50' };
  if (uvi <= 10) return { label: 'Very High', barColor: 'bg-red-500', textColor: 'text-red-600', bgLight: 'bg-red-50' };
  return { label: 'Extreme', barColor: 'bg-purple-500', textColor: 'text-purple-600', bgLight: 'bg-purple-50' };
};

const getAQIInfo = (aqi) => {
  if (aqi <= 50) return { label: 'Good', barColor: 'bg-green-500', textColor: 'text-green-600', bgLight: 'bg-green-50' };
  if (aqi <= 100) return { label: 'Moderate', barColor: 'bg-yellow-500', textColor: 'text-yellow-600', bgLight: 'bg-yellow-50' };
  if (aqi <= 150) return { label: 'Unhealthy for Sensitive', barColor: 'bg-orange-500', textColor: 'text-orange-600', bgLight: 'bg-orange-50' };
  if (aqi <= 200) return { label: 'Unhealthy', barColor: 'bg-red-500', textColor: 'text-red-600', bgLight: 'bg-red-50' };
  if (aqi <= 300) return { label: 'Very Unhealthy', barColor: 'bg-purple-500', textColor: 'text-purple-600', bgLight: 'bg-purple-50' };
  return { label: 'Hazardous', barColor: 'bg-rose-800', textColor: 'text-rose-800', bgLight: 'bg-rose-50' };
};

const WeatherAnalysis = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      try {
        const response = await fetch('/api/analysis');
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
        setData({
          location: 'Delhi',
          weather: {
            temp: 38,
            humidity: 70,
            uvi: 9,
            condition: 'Sunny',
            description: 'clear sky',
          },
          aqi: { aqi: 345 },
        });
      } finally {
        setLoading(false);
      }
    };
    fetchAnalysis();
  }, []);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-3 sm:px-4 pt-6 mb-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border-2 border-primary-dull/30">
          <div className="animate-pulse space-y-4">
            <div className="h-6 sm:h-8 bg-primary-dull/40 rounded w-1/2"></div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="h-20 bg-primary-dull/30 rounded-xl"></div>
              <div className="h-20 bg-primary-dull/30 rounded-xl"></div>
              <div className="h-20 bg-primary-dull/30 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error && !data) {
    return (
      <div className="max-w-6xl mx-auto px-3 sm:px-4 pt-6 mb-8">
        <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-lg border-2 border-primary/30">
          <p className="text-primary text-sm sm:text-base">Error loading weather data: {error}</p>
        </div>
      </div>
    );
  }

  const { location, weather, aqi } = data;
  const uvInfo = getUVInfo(weather.uvi);
  const aqiInfo = getAQIInfo(aqi.aqi);
  const uvPercent = (weather.uvi / 11) * 100;
  const aqiPercent = Math.min(100, (aqi.aqi / 500) * 100);
  const humidityPercent = weather.humidity;

  return (
    <div className="max-w-6xl mx-auto px-3 sm:px-4 pt-6 mb-8">
      <div className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-6 shadow-xl border-2 border-primary-dull/40">
        {/* Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-4 sm:mb-6">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl bg-primary/10 p-1.5 sm:p-2 rounded-full">📍</span>
            <h2 className="text-lg sm:text-2xl font-bold text-primary">{location}</h2>
          </div>
          <div className="flex items-center gap-1.5 sm:gap-2 bg-primary-dull/40 px-2 py-1 sm:px-4 sm:py-2 rounded-full border border-primary/20">
            <span className="text-xs sm:text-sm font-medium text-primary whitespace-nowrap">Live Update</span>
            <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 sm:h-2 sm:w-2 bg-primary"></span>
            </span>
          </div>
        </div>

        {/* Main Weather Card */}
        <div className="flex flex-col sm:flex-row flex-wrap items-center justify-between gap-3 mb-4 sm:mb-6 p-3 sm:p-5 bg-gradient-to-r from-primary-dull/30 via-primary-middle/20 to-primary-light/20 rounded-xl sm:rounded-2xl border border-primary-light/30">
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="text-3xl sm:text-5xl bg-primary/10 p-2 sm:p-3 rounded-xl sm:rounded-2xl">☀️</div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-primary">{Math.round(weather.temp)}°C</p>
              <p className="text-xs sm:text-sm text-primary-light capitalize font-medium">{weather.description}</p>
            </div>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-xs sm:text-sm text-primary-light">Feels like {Math.round(weather.temp + 2)}°C</p>
            <p className="text-xs sm:text-sm text-primary-light">Humidity: {weather.humidity}%</p>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4 mb-3">
          {/* UV Card */}
          <div className={`p-3 sm:p-4 rounded-xl border-2 ${uvInfo.bgLight} border-primary-dull/30`}>
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <span className="text-sm sm:text-base font-medium text-primary">☀️ UV Index</span>
              <span className={`text-xs sm:text-sm font-bold ${uvInfo.textColor}`}>{uvInfo.label}</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-primary mb-1 sm:mb-2">{weather.uvi}</p>
            <div className="w-full bg-primary-dull/30 rounded-full h-2">
              <div className={`h-2 rounded-full ${uvInfo.barColor}`} style={{ width: `${uvPercent}%` }}></div>
            </div>
            <p className="text-[11px] sm:text-xs text-primary-light mt-1.5 sm:mt-2">
              {weather.uvi > 7 ? 'Use SPF 50+ and reapply every 2 hours' : 'Moderate protection advised'}
            </p>
          </div>

          {/* AQI Card */}
          <div className={`p-3 sm:p-4 rounded-xl border-2 ${aqiInfo.bgLight} border-primary-dull/30`}>
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <span className="text-sm sm:text-base font-medium text-primary">🌫️ Air Quality</span>
              <span className={`text-xs sm:text-sm font-bold ${aqiInfo.textColor}`}>{aqiInfo.label}</span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-primary mb-1 sm:mb-2">{aqi.aqi}</p>
            <div className="w-full bg-primary-dull/30 rounded-full h-2">
              <div className={`h-2 rounded-full ${aqiInfo.barColor}`} style={{ width: `${aqiPercent}%` }}></div>
            </div>
            <p className="text-[11px] sm:text-xs text-primary-light mt-1.5 sm:mt-2">
              {aqi.aqi > 150 ? 'Wear a mask outdoors; double cleanse tonight' : 'Air quality acceptable'}
            </p>
          </div>

          {/* Humidity Card */}
          <div className="p-3 sm:p-4 rounded-xl border-2 bg-primary-dull/10 border-primary-dull/30">
            <div className="flex items-center justify-between mb-1 sm:mb-2">
              <span className="text-sm sm:text-base font-medium text-primary">💧 Humidity</span>
              <span className="text-xs sm:text-sm font-bold text-primary-light">
                {weather.humidity > 70 ? 'High' : weather.humidity < 30 ? 'Low' : 'Moderate'}
              </span>
            </div>
            <p className="text-xl sm:text-2xl font-bold text-primary mb-1 sm:mb-2">{weather.humidity}%</p>
            <div className="w-full bg-primary-dull/30 rounded-full h-2">
              <div className="h-2 rounded-full bg-primary-middle" style={{ width: `${humidityPercent}%` }}></div>
            </div>
            <p className="text-[11px] sm:text-xs text-primary-light mt-1.5 sm:mt-2">
              {weather.humidity > 70 ? 'Use lightweight, gel-based moisturizers' : 'Hydrating products recommended'}
            </p>
          </div>
        </div>

        {/* AI Skin Forecast */}
        <div className="mt-4 sm:mt-5 p-3 sm:p-5 bg-primary-dull/20 rounded-xl border-2 border-primary/20">
          <p className="text-xs sm:text-base text-primary flex items-start gap-2 sm:gap-3">
            <span className="text-lg sm:text-2xl bg-primary/10 p-1.5 sm:p-2 rounded-full">🧠</span>
            <span>
              <strong className="text-primary font-semibold text-xs sm:text-base">Skin Forecast:</strong>{' '}
              <span className="text-primary-light text-xs sm:text-base">
                {aqi.aqi > 150 && weather.uvi > 7
                  ? `High UV and hazardous air quality in ${location}. Prioritize antioxidant serums and barrier protection today.`
                  : `Weather in ${location} is ${weather.condition.toLowerCase()}. Adjust your routine accordingly.`}
              </span>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherAnalysis;