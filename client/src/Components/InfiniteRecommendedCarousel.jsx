import React from 'react';
import RecommendedCards from './RecommendedCards';

export default function InfiniteRecommendedCarousel({ products, speed = 'slow' }) {
  const speedDuration = {
    slow: '50s',
    normal: '30s',
    fast: '20s',
  };

  const animationDuration = speedDuration[speed] || '50s';
  const duplicatedProducts = [...products, ...products];

  if (!products?.length) return null;

  return (
    <div className="relative w-full overflow-hidden py-4">
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-r from-transparent to-white z-10 pointer-events-none" />

      <div
        className="flex gap-5"
        style={{
          animation: `scroll ${animationDuration} linear infinite`,
          width: 'fit-content',
        }}
        onMouseEnter={(e) => (e.currentTarget.style.animationPlayState = 'paused')}
        onMouseLeave={(e) => (e.currentTarget.style.animationPlayState = 'running')}
      >
        {duplicatedProducts.map((product, index) => (
          <RecommendedCards key={`${product.id}-${index}`} RecommendedInfo={product} />
        ))}
      </div>

      <style>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}