// components/IngredientsSection.jsx
import React, { useState } from 'react';
import { useAnalysis } from '../context/AnalysisContext';
import { useEffect } from 'react';

const IngredientsSection = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);

 const ingredientStyles = [
  {
    icon: "💧",
    color: "from-cyan-400 to-blue-500",
    bgLight: "bg-cyan-50",
    borderHover: "hover:border-cyan-400",
  },
  {
    icon: "⭐",
    color: "from-purple-400 to-pink-500",
    bgLight: "bg-purple-50",
    borderHover: "hover:border-purple-400",
  },
  {
    icon: "🛡️",
    color: "from-amber-400 to-orange-500",
    bgLight: "bg-amber-50",
    borderHover: "hover:border-amber-400",
  },
  {
    icon: "🍊",
    color: "from-orange-400 to-red-500",
    bgLight: "bg-orange-50",
    borderHover: "hover:border-orange-400",
  },
  {
    icon: "🌿",
    color: "from-green-400 to-emerald-500",
    bgLight: "bg-green-50",
    borderHover: "hover:border-green-400",
  },
  {
    icon: "⚡",
    color: "from-indigo-400 to-purple-500",
    bgLight: "bg-indigo-50",
    borderHover: "hover:border-indigo-400",
  },
];

const { analysis, loading, error } = useAnalysis();
 if (loading) return <p>Loading...</p>; 
 const {recommendation} = analysis 
 const ingredients = (recommendation.ingredients || [])
 .map((ing, index) => ({
  ...ing,
  ...ingredientStyles[index % ingredientStyles.length], // loop styles
}));

  // useEffect(() => {
  //   // console.log("Products:", products);
  // }, [ingredients]);

  return (
    // CHANGE: White background hata diya, ab beautiful gradient lagaya hai
    <div className="max-w-7xl mx-auto px-4 py-12 bg-linear-to-br from-amber-50/80 via-orange-50/80 to-rose-50/80 rounded-3xl shadow-inner">
      {/* Section Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-br from-primary to-primary-middle rounded-2xl shadow-lg mb-4">
          <span className="text-3xl">✨</span>
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-primary mb-3">
          Ingredients That Love Your Skin
        </h2>
        {/* <p className="text-primary-light max-w-2xl mx-auto">
          Scientifically-backed ingredients to transform your skincare routine
        </p> */}
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {ingredients.map((ing, idx) => (
          <div
            key={idx}
            onMouseEnter={() => setHoveredIndex(idx)}
            onMouseLeave={() => setHoveredIndex(null)}
            className={`
              group relative rounded-2xl p-6 transition-all duration-500 ease-out
              ${ing.bgLight} border-2 border-primary-dull/20
              ${ing.borderHover}
              hover:shadow-2xl hover:-translate-y-2
              cursor-pointer
            `}
          >
            {/* Animated Gradient Background on Hover */}
            <div className={`
              absolute inset-0 rounded-2xl bg-linear-to-br ${ing.color} 
              opacity-0 transition-opacity duration-500
              ${hoveredIndex === idx ? 'opacity-10' : ''}
            `}></div>

            {/* Content */}
            <div className="relative z-10">
              {/* Icon with Animation */}
              <div className={`
                inline-flex items-center justify-center w-14 h-14 rounded-xl 
                bg-linear-to-br ${ing.color} text-2xl mb-5
                transition-all duration-500
                ${hoveredIndex === idx ? 'rotate-12 scale-110' : 'rotate-0'}
              `}>
                {ing.icon}
              </div>

              {/* Name */}
              <h3 className="text-xl font-bold text-primary mb-3 group-hover:text-primary-dark transition-colors">
                {ing.name}
              </h3>

              {/* Why (Description) */}
              <p className="text-primary-light leading-relaxed">
                {ing.why}
              </p>

              {/* Decorative Line on Hover */}
              <div className={`
                mt-4 h-1 rounded-full bg-linear-to-r ${ing.color}
                transition-all duration-500
                ${hoveredIndex === idx ? 'w-full' : 'w-12'}
              `}></div>
            </div>

            {/* Floating Animation on Hover */}
            {hoveredIndex === idx && (
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-lg animate-pulse">
                <span className="text-xs">✨</span>
              </div>
            )}
          </div>
        ))}
      </div>

      
    </div>
  );
};

export default IngredientsSection;