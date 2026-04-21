import React, { useState, useEffect } from 'react';
import api from '../utils/axios';
import { toast } from 'sonner';

const Routine = () => {
  const [isMorning, setIsMorning] = useState(true);
  const [routine, setRoutine] = useState({ morning: [], night: [] });
  const [loading, setLoading] = useState(true);


useEffect(() => {
  const fetchRoutine = async () => {
    try {
      setLoading(true);

      // 👇 get user profile (you already have this logic somewhere)
      const profileRes = await api.get('/api/user/profile');
      const profile = profileRes.data.data || profileRes.data;

      // 👇 call your AI routine API
      const res = await api.post('/api/recommendation/generate', {
        skinType: profile.skinType,
        concerns: profile.concerns,
        weather: "hot",  
        aqi: "moderate"
      });
      console.log(res)
      setRoutine(res.data.routine);

    } catch (err) {
      console.error(err);
      toast.error("Failed to load routine ");
    } finally {
      setLoading(false);
    }
  };

  fetchRoutine();
}, []);

  const currentSteps = isMorning ? routine.morning : routine.night;
  const title = isMorning ? '🌅 Morning Routine' : '🌙 Night Routine';
  const overlay = isMorning ? 'from-primary-dull/40 to-primary/20' : 'from-primary-light/40 to-primary/30';

  return (
    <div className="w-full min-h-screen flex items-center justify-center p-3 sm:p-4">
      <div className="relative w-full max-w-7xl rounded-3xl overflow-hidden shadow-2xl border border-primary/20">
    
        <div className="absolute inset-0 z-0 flex flex-col md:flex-row">
         
          <div className="hidden md:block w-1/2 h-full bg-primary-dull/30 backdrop-blur-sm"></div>
          
          <div className="relative w-full md:w-1/2 h-64 md:h-full">
            {isMorning ? (
              <img
                src="https://media.istockphoto.com/id/1496614896/photo/smiling-mixed-race-young-woman-applying-moisturizer-on-her-face-in-bathroom.jpg?s=612x612&w=0&k=20&c=DdbqA5fEhFJ6J2sdLKW30X5lct1LCZ-Hc0u455kMSTE="
                alt="morning routine"
                className="w-full h-full object-contain"
              />
            ) : (
              <img
                src="https://dam.mediacorp.sg/image/upload/s--i0dGtMSb--/c_crop,h_1125,w_1500,x_0,y_1/c_fill,g_auto,h_622,w_830/f_auto,q_auto/v1/mediacorp/cna/image/2023/12/27/how_to_maximise_your_nighttime_skincare_routine%203.jpg?itok=9WL8lUn7"
                className="w-full h-full object-contain"
              />
            )}
            <div className={`absolute inset-0 bg-linear-to-br ${overlay} `}></div>
          </div>
        </div>

     
        <div className="relative z-10 flex flex-col md:flex-row min-h-125">
       
          <div className="w-full md:w-1/2 p-5 sm:p-6 md:p-10 flex flex-col justify-between bg-primary-dull/40 md:bg-transparent backdrop-blur-sm md:backdrop-blur-0">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-primary mb-5 sm:mb-6 drop-shadow-sm">
                {title}
              </h2>
              <div className="space-y-5">
                {currentSteps.map((item) => (
                  <div key={item.step} className="flex gap-4">
                    <div className="shrink-0 w-9 h-9 rounded-full bg-primary shadow-md flex items-center justify-center">
                      <span className="text-white font-bold text-lg">{item.step}</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-extrabold text-gray-900 text-base sm:text-lg">
                          {item.title}
                        </h4>
                        {item.productType && (
                          <span className="bg-white/50 border border-primary/20 text-primary text-[11px] sm:text-xs px-2.5 py-1 rounded-full font-semibold whitespace-nowrap">
                            {item.productType}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-700 text-sm sm:text-base font-medium break-words">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          
            <div className="mt-8 flex justify-center md:justify-start">
              <button
                onClick={() => setIsMorning(!isMorning)}
                className="bg-primary hover:bg-primary-light text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 flex items-center gap-3 text-base border border-white/30"
              >
                {isMorning ? (
                  <>
                    <span>🌙</span> Switch to Night Routine
                  </>
                ) : (
                  <>
                    <span>🌅</span> Switch to Morning Routine
                  </>
                )}
              </button>
            </div>
          </div>

        
          <div className="hidden md:block w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

export default Routine;