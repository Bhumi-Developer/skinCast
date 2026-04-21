import React from 'react';

const MyRoutine = () => {
  const morningRoutine = [
    { step: 1, title: 'Face Wash', description: 'Gentle cleanser', product: 'Gentle Face Wash' },
    { step: 2, title: 'Toner', description: 'Hydrating toner', product: 'Hydrating Toner' },
    { step: 3, title: 'Serum', description: 'Vitamin C serum', product: 'Vitamin C Serum' },
    { step: 4, title: 'Moisturizer', description: 'Light moisturizer', product: 'Light Moisturizer' },
    { step: 5, title: 'Sunscreen', description: 'SPF 50+', product: 'Sunscreen SPF 50' },
  ];

  const nightRoutine = [
    { step: 1, title: 'Oil Cleanser', description: 'Remove makeup', product: 'Oil Cleanser' },
    { step: 2, title: 'Face Wash', description: 'Deep clean', product: 'Gentle Face Wash' },
    { step: 3, title: 'Serum', description: 'Retinol serum', product: 'Retinol Serum' },
    { step: 4, title: 'Moisturizer', description: 'Night cream', product: 'Night Cream' },
    { step: 5, title: 'Eye Cream', description: 'Under eye care', product: 'Under Eye Cream' },
  ];

  const RoutineList = ({ title, routine, icon }) => (
    <div className="bg-[#f5ebe6]/80 backdrop-blur-sm rounded-3xl p-6 shadow-[8px_8px_16px_#d9cbc4,-8px_-8px_16px_#ffffff]">
      <h2 className="text-2xl font-bold text-primary mb-6 flex items-center gap-2 border-b border-primary-dull/40 pb-3">
        <span className="text-3xl">{icon}</span> {title}
      </h2>
      <div className="space-y-1">
        {routine.map((item) => (
          <div key={item.step} className="group">
            <div className="flex items-start gap-4 py-3 border-b border-primary/10 last:border-0 transition-all hover:bg-primary-dull/10 rounded-lg px-2">
              <div className="flex-shrink-0 w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm font-bold shadow-[2px_2px_4px_#b89386]">
                {item.step}
              </div>
              <div className="flex-1">
                <div className="flex flex-wrap items-baseline gap-2">
                  <h3 className="font-semibold text-gray-800 text-lg">{item.title}</h3>
                  <span className="text-xs text-primary-light font-medium uppercase tracking-wider">
                    {item.product}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-0.5">{item.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
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
      <div className="relative z-10 max-w-5xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-8 text-center md:text-left">My Routine</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RoutineList title="Morning Routine" routine={morningRoutine} icon="🌅" />
          <RoutineList title="Night Routine" routine={nightRoutine} icon="🌙" />
        </div>
      </div>
    </div>
  );
};

export default MyRoutine;