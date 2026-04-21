// components/AvoidSection.jsx
import React, { useState } from 'react';
import { useAnalysis } from '../context/AnalysisContext';

const AvoidSection = () => {
  const [hoveredId, setHoveredId] = useState(null);

const avoidStyles = [
  {
    icon: "🧼",
    effect: "Skin Barrier Damage",
  },
  {
    icon: "🧪",
    effect: "Hormonal Disruption",
  },
  {
    icon: "🌸",
    effect: "Allergic Reactions",
  },
  {
    icon: "🍸",
    effect: "Extreme Dryness",
  },
  {
    icon: "☣️",
    effect: "Carcinogenic Risk",
  },
  {
    icon: "⛽",
    effect: "Clogs Pores",
  },
];
const { analysis, loading } = useAnalysis();

if (loading) return <p>Loading...</p>;

const avoidIngredients = (analysis?.recommendation?.avoid || []).map(
  (item, index) => ({
    id: index + 1,
    name: item.name,
    why: item.whyAvoid,
    ...avoidStyles[index % avoidStyles.length],
  })
);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      {/* Section Header with Diagonal Accent */}
      <div className="relative mb-16">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-20 h-20 bg-red-500/10 rounded-full blur-2xl"></div>
        <div className="absolute right-0 bottom-0 w-32 h-32 bg-rose-500/10 rounded-full blur-2xl"></div>
        
        <div className="text-center relative">
          {/* <div className="inline-flex items-center justify-center w-20 h-20 bg-linear-to-br from-red-500 to-rose-600 rounded-full shadow-xl mb-5 transform -rotate-12 hover:rotate-0 transition-transform duration-500">
            <span className="text-4xl">⛔</span>
          </div> */}
          <h2 className="text-4xl md:text-5xl font-bold mb-3">
            <span className="text-primary">Never Put</span>
            <span className="bg-linear-to-r from-red-500 to-rose-500 bg-clip-text text-transparent ml-3">These On Your Face</span>
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
            <div className="absolute inset-0 bg-linear-to-r from-red-50 to-rose-50 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            
            <div className="relative p-5 flex items-start gap-4">
              {/* Left Icon Column */}
              <div className="shrink-0">
                <div className={`
                  w-16 h-16 rounded-2xl bg-linear-to-br from-red-100 to-rose-100 
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
                absolute bottom-0 right-0 w-20 h-20 bg-linear-to-tl from-red-500/20 to-transparent 
                transform rotate-45 transition-all duration-500
                ${hoveredId === item.id ? 'translate-x-0 translate-y-0' : 'translate-x-10 translate-y-10'}
              `}></div>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Callout - Different style */}
      {/* <div className="mt-12 relative">
        <div className="bg-linear-to-r from-red-500/10 via-rose-500/10 to-pink-500/10 rounded-2xl p-6 border border-red-200 backdrop-blur-sm">
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