import React, { useState } from 'react';
import { useAnalysis } from '../context/AnalysisContext';

const AlternativeRemedySection = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { analysis } = useAnalysis();
  
  console.log('Analysis:', analysis);
  
  // ✅ Get homeRemedies from the correct path
  const remedies = analysis?.recommendation?.homeRemedies || [];

  return (
    <>
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="relative overflow-hidden rounded-2xl bg-linear-to-r from-amber-50 via-orange-50 to-amber-100 shadow-xl border border-amber-200/60">
          
          {/* Decorative abstract shapes */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-orange-200/30 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-6 md:p-8">
            {/* Left side: text and button */}
            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full text-sm text-amber-700 mb-3">
                <span>🌿</span> Natural Alternative
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-stone-800 mb-2">
                Don't have these products?
              </h3>
              <p className="text-stone-600 text-base md:text-lg max-w-md mx-auto md:mx-0">
                No worries! Try our gentle, effective home remedies using ingredients from your kitchen.
              </p>
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-5 inline-flex items-center gap-2 bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white font-semibold px-6 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300 group"
              >
                <span>Explore Home Remedies</span>
                <span className="text-lg group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>

            {/* Right side: visual hint */}
            <div className="flex gap-3 items-center">
              <div className="w-16 h-16 rounded-full bg-white/80 shadow-md flex items-center justify-center text-3xl border border-amber-200">
                🌿
              </div>
              <div className="w-12 h-12 rounded-full bg-white/80 shadow-md flex items-center justify-center text-2xl border border-amber-200">
                🥒
              </div>
              <div className="w-10 h-10 rounded-full bg-white/80 shadow-md flex items-center justify-center text-xl border border-amber-200">
                🍯
              </div>
              <div className="w-8 h-8 rounded-full bg-white/80 shadow-md flex items-center justify-center text-sm border border-amber-200">
                ✨
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Popup */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-amber-100 px-6 py-4 flex justify-between items-center">
              <h2 className="text-2xl font-serif font-bold text-stone-800">
                ✨ Natural Home Remedies
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex items-center gap-2 bg-amber-50 hover:bg-amber-100 text-stone-700 px-4 py-2 rounded-full transition"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Analysis
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 md:p-8">
              {remedies.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-stone-500">No home remedies available at the moment.</p>
                </div>
              ) : (
                <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
                  {remedies.map((remedy, index) => (
                    <div key={index} className="bg-white rounded-xl border border-amber-100 shadow-md overflow-hidden hover:shadow-lg transition">
                      <div className="bg-linear-to-r from-amber-50 to-orange-50 px-5 py-4 flex items-center gap-3">
                        {/* ✅ Use fallback icon if not provided */}
                        <div className="text-3xl">{remedy.icon || '🌿'}</div>
                        <h3 className="text-xl font-serif font-bold text-stone-800">{remedy.name}</h3>
                      </div>
                      <div className="p-5">
                        <p className="text-stone-600 text-sm mb-4 border-l-3 border-amber-300 pl-3 italic">{remedy.benefits || remedy.description}</p>
                        
                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="bg-amber-50 text-amber-800 text-xs px-3 py-1 rounded-full">🌟 {remedy.benefits || 'Good for skin'}</span>
                          <span className="bg-stone-100 text-stone-700 text-xs px-3 py-1 rounded-full">⏱️ Use as needed</span>
                        </div>
                        
                        {/* ✅ Ingredients section with safety checks */}
                        {/* <div className="mb-4">
                          <h4 className="font-semibold text-stone-700 text-sm uppercase tracking-wide mb-2">Ingredients</h4>
                          <ul className="space-y-1 text-sm text-stone-600">
                            {(remedy.ingredients || remedy.steps || []).map((item, i) => (
                              <li key={i} className="flex gap-2">
                                <span className="text-amber-500">✓</span>{item}
                              </li>
                            ))}
                          </ul>
                        </div> */}
                        
                        {/* ✅ Steps section with safety checks */}
                        <div>
                          <h4 className="font-semibold text-stone-700 text-sm uppercase tracking-wide mb-2">How to Use</h4>
                          <ol className="space-y-1 text-sm text-stone-600 list-decimal list-inside">
                            {(remedy.steps || remedy.ingredients || []).map((step, i) => (
                              <li key={i}>{step}</li>
                            ))}
                          </ol>
                        </div>
                        
                        {/* ✅ Why it works section */}
                        {remedy.whyItWorks && (
                          <div className="mt-4 p-3 bg-amber-50 rounded-lg">
                            <h4 className="font-semibold text-stone-700 text-sm uppercase tracking-wide mb-1">✨ Why It Works</h4>
                            <p className="text-sm text-stone-600">{remedy.whyItWorks}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
              <div className="mt-6 text-center text-xs text-stone-400 border-t border-amber-100 pt-4">
                💡 Always patch test before use. Consult a dermatologist for persistent issues.
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AlternativeRemedySection;