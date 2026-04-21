import React, { useState } from 'react';
import Picture from'../assets/banner2.jpeg'
const AnimatedBanner = () => {
  const [hasAnimated, setHasAnimated] = useState(false);

  const handleMouseEnter = () => {
    if (!hasAnimated) {
      setHasAnimated(true);
    }
  };

  return (
    <div className="w-full px-4 py-4 pt-15">
      <div className="max-w-7xl mx-auto">
        {/* Neumorphic container */}
        <div
          onMouseEnter={handleMouseEnter}
          className="group relative w-full h-[450px] overflow-hidden rounded-2xl bg-[#f5ebe6] shadow-[8px_8px_16px_#d9cbc4,-8px_-8px_16px_#ffffff] hover:shadow-[inset_8px_8px_16px_#d9cbc4,inset_-8px_-8px_16px_#ffffff] transition-all duration-500"
        >
          <div className="flex items-center h-full">
            
            {/* Image Section - slides in from left on first hover, then stays */}
            <div
              className={`w-1/2 h-full transform transition-all duration-700 ease-out ${
                hasAnimated ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
              }`}
            >
              <div className="h-full border-4 border-primary/30 rounded-l-2xl overflow-hidden">
                <img
                  src={Picture}
                  alt="Skincare routine"
                  className="w-full h-full object-cover object-center"
                />
              </div>
            </div>

            {/* Text Section - slides in from right on first hover, then stays */}
            <div
              className={`w-1/2 h-full flex flex-col justify-center px-8 transform transition-all duration-700 ease-out ${
                hasAnimated ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
              }`}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-tight">
                Skin Harmony:{' '}
                <span className="text-primary">Care That Understands You</span>
              </h2>
              
              <p className="text-gray-700 text-base md:text-lg mb-6 leading-relaxed">
                Personalized skincare made simple—helping you achieve healthy, radiant skin with products that truly match your needs.
              </p>
              
              {/* <button className="bg-primary hover:bg-primary-light text-white text-base font-semibold py-3 px-6 rounded-xl transition-all duration-300 shadow-[4px_4px_8px_#d9cbc4,-4px_-4px_8px_#ffffff] hover:shadow-[inset_4px_4px_8px_#b89386,inset_-4px_-4px_8px_#d4957a] w-fit">
                Discover Now
              </button> */}
            </div>
          </div>

          {/* Decorative accent line */}
          <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent"></div>
        </div>
      </div>
    </div>
  );
};

export default AnimatedBanner;