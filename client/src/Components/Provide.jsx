import React from 'react';

const concerns = [
  { 
    name: 'Home Remedies', 
    icon: '🌿', 
    line1: 'Natural solutions',
    line2: 'at home'
  },
  { 
    name: 'Ingredients', 
    icon: '🥒', 
    line1: 'Key components',
    line2: 'explained clearly'
  },
  { 
    name: 'What to Avoid', 
    icon: '🚫', 
    line1: 'Steer clear of',
    line2: 'harmful stuff'
  },
  { 
    name: 'Products on Ingredients', 
    icon: '🧴', 
    line1: 'Find products by',
    line2: 'key ingredients'
  },
];

const Skin = () => {
  return (
    <section className="w-full py-8 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <h2 className="text-xl md:text-3xl font-bold text-primary text-center mb-6">
          ✨ What We <span className='text-blue'>Provide</span>✨
        </h2>

        {/* Cards Grid – 4 in a row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {concerns.map((item, idx) => (
            <div
              key={idx}
              className="group bg-[#f5ebe6] rounded-2xl p-5 flex flex-col items-center justify-center text-center cursor-pointer
                shadow-[6px_6px_12px_#d9cbc4,-6px_-6px_12px_#ffffff] 
                hover:shadow-[inset_6px_6px_12px_#d9cbc4,inset_-6px_-6px_12px_#ffffff]
                transition-all duration-300 hover:scale-[0.98]"
            >
              <span className="text-3xl mb-2 group-hover:scale-110 transition-transform duration-300">
                {item.icon}
              </span>
              <p className="text-primary text-xl font-bold md:text-lg">
                {item.name}
              </p>
              {/* Two descriptive lines – larger and bold */}
              <p className="text-sm font-semibold text-gray-700 mt-1">
                {item.line1}
              </p>
              <p className="text-sm font-semibold text-gray-700">
                {item.line2}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skin;