// components/AvoidSection.jsx
import React, { useState } from 'react';

const AvoidSection = () => {
  const [hoveredId, setHoveredId] = useState(null);

  const avoidIngredients = [
    {
      id: 1,
      name: "Sulfates (SLS/SLES)",
      why: "Harsh detergents that strip natural oils, damage moisture barrier, and cause irritation. Look for sulfate-free gentle cleansers instead!",
      icon: "🧼",
      effect: "Skin Barrier Damage"
    },
    {
      id: 2,
      name: "Parabens",
      why: "Preservatives that may disrupt hormones and cause skin sensitivity. Choose 'paraben-free' products for safer skincare.",
      icon: "🧪",
      effect: "Hormonal Disruption"
    },
    {
      id: 3,
      name: "Synthetic Fragrance",
      why: "Hidden irritant causing allergies, headaches, and breakouts. Opt for 'fragrance-free' or naturally scented products.",
      icon: "🌸",
      effect: "Allergic Reactions"
    },
    {
      id: 4,
      name: "Denatured Alcohol",
      why: "Dries out skin, strips protective barrier, causes premature aging. Avoid in toners and moisturizers!",
      icon: "🍸",
      effect: "Extreme Dryness"
    },
    {
      id: 5,
      name: "Formaldehyde Releasers",
      why: "Preservatives that slowly release formaldehyde - known allergen and potential carcinogen. Big NO for sensitive skin!",
      icon: "☣️",
      effect: "Carcinogenic Risk"
    },
    {
      id: 6,
      name: "Mineral Oil",
      why: "Creates a plastic film on skin, traps dirt and bacteria, doesn't provide real hydration. Choose plant-based oils instead!",
      icon: "⛽",
      effect: "Clogs Pores"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Section Header with Diagonal Accent */}
      <div className="relative mb-16">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-20 bg-red-500/10 rounded-full blur-2xl"></div>
        <div className="absolute right-0 bottom-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl"></div>
        
        <div className="text-center relative">
          {/* <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-red-500 to-rose-600 rounded-full shadow-xl mb-5 transform -rotate-12 hover:rotate-0 transition-transform duration-500">
            <span className="text-4xl">⛔</span>
          </div> */}
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-primary">Never Put</span>
            <span className="bg-gradient-to-r from-red-500 to-rose-500 bg-clip-text text-transparent ml-3">These On Your Face</span>
          </h2>
          <div className="flex justify-center gap-2 mt-3">
            <div className="w-16 h-1 bg-red-400 rounded-full"></div>
            <div className="w-8 h-1 bg-rose-400 rounded-full"></div>
            <div className="w-4 h-1 bg-pink-400 rounded-full"></div>
          </div>
          <p className="text-primary-light mt-4 max-w-2xl mx-auto">
            Hidden dangers in your skincare products – learn what to avoid for healthy, glowing skin
          </p>
        </div>
      </div>

      {/* Cards - Horizontal split card design (modern) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {avoidIngredients.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredId(item.id)}
            onMouseLeave={() => setHoveredId(null)}
            className="group relative bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 border-l-[6px] border-l-red-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-red-50 to-rose-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative p-5 flex items-start gap-4">
              {/* Left Icon Column */}
              <div className="flex-shrink-0">
                <div className={`
                  w-16 h-16 rounded-2xl bg-gradient-to-br from-red-100 to-rose-100 
                  flex items-center justify-center text-3xl
                  transition-all duration-500
                  ${hoveredId === item.id ? 'scale-110 rotate-6 shadow-lg' : ''}
                `}>
                  {item.icon}
                </div>
              </div>

              {/* Right Content */}
              <div className="flex-1">
                <div className="flex items-center justify-between flex-wrap gap-2 mb-2">
                  <h3 className="text-xl font-bold text-primary group-hover:text-red-600 transition-colors">
                    {item.name}
                  </h3>
                  <span className="text-xs font-semibold bg-red-100 text-red-600 px-2 py-1 rounded-full">
                    🚫 {item.effect}
                  </span>
                </div>
                <p className="text-primary-light text-sm leading-relaxed">
                  {item.why}
                </p>
                
                {/* Expandable detail on hover */}
                <div className={`
                  mt-3 overflow-hidden transition-all duration-500
                  ${hoveredId === item.id ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}
                `}>
                  <div className="flex items-center gap-2 text-xs text-red-500 font-medium">
                    <span>⚠️</span>
                    <span>Check your product labels for this ingredient</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated corner slash */}
            <div className="absolute bottom-0 right-0 w-16 h-16 overflow-hidden pointer-events-none">
              <div className={`
                absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-red-500/20 to-transparent 
                transform rotate-45 transition-all duration-500
                ${hoveredId === item.id ? 'translate-x-0 translate-y-0' : 'translate-x-10 translate-y-10'}
              `}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Callout - Different style */}
      {/* <div className="mt-12 relative">
        <div className="bg-gradient-to-r from-red-500/10 via-rose-500/10 to-pink-500/10 rounded-2xl p-6 border border-red-200 backdrop-blur-sm">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">📋</span>
              <div>
                <p className="font-bold text-primary">How to check your products?</p>
                <p className="text-sm text-primary-light">Look for "paraben-free", "sulfate-free", "fragrance-free" labels</p>
              </div>
            </div>
            
          </div>
        </div>
      </div> */}
    </div>
  );
};

export default AvoidSection;