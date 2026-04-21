import React from 'react';
import { useAppContext } from '../context/AppContext';
import { Bookmark } from 'lucide-react';
import { useState } from 'react';
export default function RecommendedCards({ RecommendedInfo }) {
  const { user, addToSavedProducts } = useAppContext();
  const [saved, setSaved] = useState(false);

const handleSave = () => {
  if (!user) {
    alert("Please sign in first");
    return;
  }

  addToSavedProducts(RecommendedInfo);
  setSaved(prev => !prev); // 👈 correct toggle
};

  const handleShopNow = () => {
    window.open(`https://dummyjson.com/products/${RecommendedInfo?.id}`, '_blank');
  };

  return (
    <div className="w-[320px] sm:w-[360px]">

      <div
        className="relative rounded-2xl overflow-hidden 
        border border-primary/20
        shadow-[0_10px_30px_rgba(183,116,102,0.35)] 
        hover:shadow-[0_15px_40px_rgba(183,116,102,0.45)] 
        transition-all duration-500 group h-[340px]"
      >

        {/* IMAGE */}
        <img
          src={RecommendedInfo?.thumbnail}
          alt={RecommendedInfo?.title}
          className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
        />

        {/* GRADIENT OVERLAY */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/50 via-primary-middle/40 to-transparent"></div>

        {/* SAVE ICON */}
        <button
  onClick={handleSave}
  className={`absolute top-3 right-3 p-2 rounded-full shadow transition-all duration-300 
    ${saved ? 'bg-black scale-110' : 'bg-white/80 hover:bg-white'}
  `}
>
  <Bookmark 
    className={`w-4 h-4 transition-colors duration-300 
      ${saved ? 'text-white fill-white' : 'text-black'}
    `}
  />
</button>
        {/* CONTENT */}
        <div className="absolute bottom-0 p-4 text-white w-full">
          
          {/* TITLE + PRICE */}
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-sm md:text-base line-clamp-2">
              {RecommendedInfo?.title}
            </h3>
            <span className="text-xs bg-white/20 px-2 py-1 rounded-full">
              ${RecommendedInfo?.price}
            </span>
          </div>

          {/* DESCRIPTION */}
          <p className="text-[14px] text-white mt-1 line-clamp-2">
            {RecommendedInfo?.description}
          </p>

          {/* TAGS */}
          <div className="flex gap-2 mt-2 flex-wrap">
            <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full">
              ⭐ {RecommendedInfo?.rating}
            </span>
            <span className="bg-white/20 text-[10px] px-2 py-0.5 rounded-full">
              {RecommendedInfo?.category || "Skincare"}
            </span>
          </div>

          {/* BUTTON */}
          <button
            onClick={handleShopNow}
            className="mt-3 w-full bg-white text-black text-xs font-semibold py-2 rounded-full hover:bg-gray-200 transition"
          >
            Shop now
          </button>

        </div>
      </div>

      {/* LINE CLAMP */}
      <style>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>

    </div>
  );
}