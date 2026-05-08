import React from 'react';

const AboutUs = () => {
  return (
    <div className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-[#fdf8f5] via-white to-[#f5ebe6]">
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-primary-dull/10 rounded-full blur-3xl -z-10"></div>

      <div className="w-full max-w-7xl mx-auto px-6 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
          
          <div className="w-full lg:w-1/2">
            <div className="relative rounded-[40px] overflow-hidden shadow-2xl group">
              <img
                src="https://i.pinimg.com/736x/b5/6c/8e/b56c8e9a50a9aa044c56953884e3cddb.jpg"
                alt="Natural skincare ingredients"
                className="w-full h-auto lg:h-[550px] object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                <p className="text-sm uppercase tracking-[0.3em] mb-2 opacity-80">Our Philosophy</p>
                <h2 className="text-3xl md:text-4xl font-light leading-tight">
                  Beauty in <br />
                  <span className="font-bold">simplicity.</span>
                </h2>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-1/2 space-y-8">
            <div>
              <span className="text-primary text-4xl uppercase tracking-wider font-bold">About SkinCast</span>
              {/* <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mt-2 leading-tight">
                Skincare that <br />
                <span className="text-primary">listens to the sky</span>
              </h1> */}
            </div>

            {/* <p className="text-gray-600 text-lg leading-relaxed border-l-4 border-primary/40 pl-6">
              We blend real‑time weather intelligence with ingredient science to create routines that actually work — 
              every single day, no matter the forecast.
            </p> */}

            <div className="grid grid-cols-2 gap-6 pt-4">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-xl mb-3">
                  🌤️
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Weather‑Aware</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Humidity, UV, pollution — we factor it all in.
                </p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-xl mb-3">
                  🧪
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Ingredient Smart</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  We decode labels so you don't have to.
                </p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-xl mb-3">
                  🌿
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Kitchen Remedies</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Natural fixes from your pantry, backed by tradition.
                </p>
              </div>
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary text-xl mb-3">
                  📈
                </div>
                <h3 className="font-semibold text-gray-800 mb-1">Always Learning</h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  Your skin changes — our recommendations evolve with you.
                </p>
              </div>
            </div>

            <div className="mt-6 p-5 bg-primary/5 rounded-2xl border border-primary/20 backdrop-blur-sm">
              <div className="flex items-start gap-3">
                <div className="text-3xl">🤖</div>
                <div>
                  <h3 className="font-semibold text-gray-800 text-lg flex items-center gap-2">
                    Meet SkinAI
                    <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full">AI Assistant</span>
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mt-1">
                    Our friendly chatbot is here 24/7 to answer your skincare questions.
                  </p>
                  <div className="flex flex-wrap gap-3 mt-3 text-xs text-primary-light">
                    <span>💬 "What's good for dry skin?"</span>
                    <span>🌿 "Show me home remedies"</span>
                  </div>
                </div>
              </div>
            </div>

            
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;