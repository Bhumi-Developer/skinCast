

import React, { useState, useEffect, useMemo } from 'react';
import { useAppContext } from '../context/AppContext';
import { Link } from 'react-router-dom';

const Banners = () => {
  const { setShowFormPopup } = useAppContext();
  const originalBanners = [
    {
      id: 1,
      image: "https://i.pinimg.com/736x/a0/9e/78/a09e78b6fedbdbc16c4b31423e1e9cff.jpg",
      title: "Your skin, synced with the sky",
      description: "Humidity drops? UV spikes? Rain or shine – get personalised skincare routines based on your local weather and seasonal changes.",
      conditionBadges: ['☀️ High UV', '💨 Dry Wind', '🌧️ Humidity', '❄️ Cold Air'],
      weatherIcon: "🌤️",
    },
    {
      id: 2,
      image: "https://i.pinimg.com/1200x/c2/6f/8b/c26f8bd16330c28900972656c3cf6457.jpg",
      title: "UV Shield activated",
      description: "High UV index today. Protect with SPF 50 + antioxidant serum. Reapply every 2 hours.",
      conditionBadges: ['☀️ Extreme UV', '🔥 Heatwave', '💨 Dry Wind'],
      weatherIcon: "☀️",
    },
    {
      id: 3,
      image: "https://i.pinimg.com/736x/a0/61/b7/a061b7b56959e3df5ddf767c47f7610b.jpg",
      title: "Humidity rescue",
      description: "Sticky & humid – switch to lightweight gel moisturizer and oil-free cleanser.",
      conditionBadges: ['💧 High Humidity', '🌫️ Muggy', '💨 Sticky Air'],
      weatherIcon: "💨",
    },
    {
      id: 4,
      image: "https://i.pinimg.com/736x/5c/e8/5d/5ce85d244551a34b161442dec550d9e7.jpg",
      title: "Cold weather armor",
      description: "Freezing temperatures. Barrier-repair creams + overnight masks for extreme protection.",
      conditionBadges: ['❄️ Freezing', '🌬️ Wind Chill', '☃️ Snow'],
      weatherIcon: "❄️",
    },
    {
      id: 5,
      image: "https://i.pinimg.com/736x/cc/b5/89/ccb589a432b24ed99e44f1b3c75513f4.jpg",
      title: "Wind & pollution shield",
      description: "High winds & poor AQI. Use antioxidant mist and pollution-blocking moisturizer.",
      conditionBadges: ['🌬️ Strong Wind', '🏭 Poor AQI', '🌫️ Dust'],
      weatherIcon: "🌬️",
    },
    {
      id: 6,
      image: "https://i.pinimg.com/736x/9d/7c/33/9d7c331ecab9220902e15e49207698e8.jpg",
      title: "Post-rain radiance",
      description: "Rain just cleared – perfect time for gentle exfoliation and vitamin C boost.",
      conditionBadges: ['🌈 After Rain', '💧 Fresh Air', '🌿 Clean'],
      weatherIcon: "🌈",
    },
  ];

  // Flow: 1,2,3,4,5,6,5,4,3,2,1 and repeat
  const banners = useMemo(() => {
    const forward = [...originalBanners];
    const backward = [...originalBanners].reverse().slice(1); // [5,4,3,2,1]
    return [...forward, ...backward];
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const totalSlides = banners.length;

  // Auto-slide effect
  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalSlides);
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, totalSlides]);

  const goToSlide = (originalId) => {
    const targetIndex = banners.findIndex((b) => b.id === originalId);
    if (targetIndex !== -1) {
      setCurrentIndex(targetIndex);
      setIsAutoPlaying(false);
      setTimeout(() => setIsAutoPlaying(true), 10000);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
    setIsAutoPlaying(false);
    setTimeout(() => setIsAutoPlaying(true), 10000);
  };

  const current = banners[currentIndex];

  return (
    <div className="w-full bg-gradient-to-br from-[#FFE1AF] to-white px-4 py-2">
      <div className="max-w-7xl mx-auto h-full">
        <div className="relative rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 h-[calc(100vh-100px)] md:h-[calc(100vh-120px)] lg:h-[calc(100vh-130px)] min-h-[550px] max-h-[800px]">
          <div className="absolute inset-0 bg-gradient-to-r from-[#B77466]/10 to-[#E2B59A]/20"></div>

          <div
            className="flex transition-transform duration-700 ease-out h-full"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {banners.map((banner, idx) => (
              <div
                key={`${banner.id}-${idx}`}
                className="w-full flex-shrink-0 relative z-10 flex flex-col lg:flex-row items-stretch h-full"
              >
                {/* Left side */}
                <div className="w-full lg:w-1/2 p-6 md:p-8 lg:p-10 xl:p-12 flex flex-col justify-center bg-white/80 backdrop-blur-sm lg:bg-transparent lg:backdrop-blur-0 h-full">
                  <span className="text-[#B77466] font-semibold text-xs md:text-sm uppercase tracking-wider mb-2 md:mb-3 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-[#B77466]"></span>
                    Weather‑Adapted Skincare
                  </span>

                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-800 mb-3 md:mb-4 lg:mb-5 leading-tight">
                    {banner.title}
                  </h1>

                  <p className="text-gray-600 text-sm md:text-base lg:text-lg mb-4 md:mb-5 lg:mb-6 leading-relaxed">
                    {banner.description}
                  </p>

                  <div className="flex flex-wrap gap-2 md:gap-3 mb-5 md:mb-6 lg:mb-7">
                    {banner.conditionBadges.map((condition, idx) => (
                      <span
                        key={idx}
                        className="bg-[#FFE1AF] text-[#957C62] px-3 md:px-4 py-1.5 md:py-2 rounded-full text-xs md:text-sm font-medium shadow-sm"
                      >
                        {condition}
                      </span>
                    ))}
                  </div>

                  <button
                    onClick={() => setShowFormPopup(true)}
                    className="bg-[#B77466] hover:bg-[#957C62] text-white font-semibold py-2.5 md:py-3 px-6 md:px-8 rounded-xl transition duration-200 shadow-md hover:shadow-lg w-full sm:w-auto text-center flex items-center justify-center gap-2 text-sm md:text-base"
                  >
                    Start-Analysis
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>

                {/* Right side - Image */}
                <div className="w-full lg:w-1/2 h-full relative">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="w-full h-full object-cover object-center"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#B77466]/20 via-transparent to-transparent pointer-events-none"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation arrows */}
          <button
            onClick={prevSlide}
            className="absolute left-3 md:left-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white drop-shadow-lg transition-all duration-200 z-20 text-xl md:text-2xl font-bold"
            aria-label="Previous"
          >
            ❮
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 md:right-4 top-1/2 -translate-y-1/2 w-8 h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-white drop-shadow-lg transition-all duration-200 z-20 text-xl md:text-2xl font-bold"
            aria-label="Next"
          >
            ❯
          </button>

          {/* Dot indicators */}
          <div className="absolute bottom-3 md:bottom-4 left-0 right-0 flex justify-center gap-1.5 md:gap-2 z-20">
            {originalBanners.map((banner) => (
              <button
                key={banner.id}
                onClick={() => goToSlide(banner.id)}
                className={`h-1.5 md:h-2 rounded-full transition-all duration-300 ${
                  current.id === banner.id ? 'w-6 md:w-8 bg-[#B77466]' : 'w-2 md:w-3 bg-white/60 hover:bg-white/80'
                }`}
                aria-label={`Go to slide ${banner.id}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banners;