import React, { useEffect, useMemo, useState } from 'react';
import api from '../../utils/axios';
import { toast } from 'sonner';

const MyRoutine = () => {
  const [loading, setLoading] = useState(true);
  const [latest, setLatest] = useState(null);

  useEffect(() => {
    const fetchLatestRoutine = async () => {
      try {
        setLoading(true);
        const res = await api.get('/api/recommendation/routines');
        const routines = Array.isArray(res?.data) ? res.data : [];
        setLatest(routines[0] || null);
      } catch (e) {
        toast.error(e?.response?.data?.message || 'Failed to load routines');
        setLatest(null);
      } finally {
        setLoading(false);
      }
    };

    fetchLatestRoutine();
  }, []);

  const morningRoutine = useMemo(() => latest?.morning || [], [latest]);
  const nightRoutine = useMemo(() => latest?.night || [], [latest]);

  const RoutineList = ({ title, routine, icon }) => (
    <div className="bg-[#f5ebe6]/80 backdrop-blur-sm rounded-3xl p-5 sm:p-6 shadow-[8px_8px_16px_#d9cbc4,-8px_-8px_16px_#ffffff]">
      <h2 className="text-xl sm:text-2xl font-bold text-primary mb-5 sm:mb-6 flex items-center gap-2 border-b border-primary-dull/40 pb-3">
        <span className="text-3xl">{icon}</span> {title}
      </h2>
      <div className="space-y-1">
        {routine.map((item) => (
          <div key={item.step} className="group">
            <div className="flex items-start gap-4 py-3 border-b border-primary/10 last:border-0 transition-all hover:bg-primary-dull/10 rounded-lg px-2">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shadow-[2px_2px_4px_#b89386]">
                {item.step}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="font-semibold text-gray-800 text-base sm:text-lg">
                    {item.title}
                  </h3>
                  {item.productType && (
                    <span className="text-[11px] sm:text-xs text-primary-light font-medium uppercase tracking-wider whitespace-nowrap">
                      {item.productType}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-600 mt-0.5 break-words">
                  {item.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-full overflow-hidden">
      {/* Background Image – z‑index: 0 */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Skincare routine background"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]"></div>
      </div>

      {/* Content – z‑index: 10 */}
      <div className="relative z-10 max-w-5xl mx-auto px-3 sm:px-4 py-5 sm:py-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-primary mb-6 sm:mb-8 text-center md:text-left">
          My Routine
        </h1>

        {loading ? (
          <div className="bg-[#f5ebe6]/80 backdrop-blur-sm rounded-3xl p-8 text-center shadow-[8px_8px_16px_#d9cbc4,-8px_-8px_16px_#ffffff]">
            <p className="text-primary-light text-lg">Loading…</p>
          </div>
        ) : !latest ? (
          <div className="bg-[#f5ebe6]/80 backdrop-blur-sm rounded-3xl p-8 text-center shadow-[8px_8px_16px_#d9cbc4,-8px_-8px_16px_#ffffff]">
            <p className="text-primary-light text-lg">No routine yet</p>
            <p className="text-sm text-gray-600 mt-2">
              Generate a routine from the analysis page first.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <RoutineList title="Morning Routine" routine={morningRoutine} icon="🌅" />
            <RoutineList title="Night Routine" routine={nightRoutine} icon="🌙" />
          </div>
        )}
      </div>
    </div>
  );
};

export default MyRoutine;