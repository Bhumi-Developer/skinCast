import React from 'react';

const TrustSection = () => {
  const trustPoints = [
    {
      icon: "🔬",
      title: "Dermatologist Approved",
      description: "Developed with leading dermatologists and skincare experts for science-backed routines."
    },
    {
      icon: "🌡️",
      title: "Real-Time Weather Data",
      description: "Powered by accurate local weather APIs to adapt recommendations as conditions change."
    },
    {
      icon: "🧴",
      title: "Clean Ingredients",
      description: "We only recommend products with non-toxic, skin-loving, and sustainable ingredients."
    },
    {
      icon: "👥",
      title: "10,000+ Happy Users",
      description: "Join thousands who've transformed their skincare routine with weather-smart advice."
    }
  ];

  const stats = [
    { value: "98%", label: "User Satisfaction" },
    { value: "50K+", label: "Routines Generated" },
    { value: "24/7", label: "Live Weather Sync" },
    { value: "15+", label: "Countries Served" }
  ];

  return (
    <div className="w-full bg-white py-16 md:py-10 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[#B77466] font-semibold text-sm uppercase tracking-wider mb-3 inline-block">
            Why Trust Us
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Science meets{' '}
            <span className="text-[#B77466]">nature</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We combine meteorological precision with dermatological expertise to give your skin exactly what it needs, when it needs it.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="text-center p-6 rounded-2xl bg-gradient-to-br from-[#FFE1AF]/30 to-white border border-[#FFE1AF]/50"
            >
              <div className="text-3xl md:text-4xl font-bold text-[#B77466] mb-2">
                {stat.value}
              </div>
              <div className="text-gray-600 text-sm font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Trust Points Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {trustPoints.map((point, idx) => (
            <div
              key={idx}
              className="group bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-[#FFE1AF]"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300 inline-block">
                {point.icon}
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                {point.title}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {point.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Banner - Guarantee */}
        <div className="relative rounded-2xl overflow-hidden bg-gradient-to-r from-[#B77466] to-[#E2B59A] p-8 md:p-10">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl"></div>
          <div className="absolute bottom-0 left-0 w-40 h-40 bg-white/5 rounded-full blur-2xl"></div>
          
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
                <span className="text-3xl">💯</span>
                <span className="text-white font-bold text-xl">30-Day Weather Adaptation Guarantee</span>
              </div>
              <p className="text-white/90 text-sm md:text-base max-w-lg">
                Not seeing results? Our weather-smart algorithm adapts to your local conditions. 
                Get personalized adjustments or your money back.
              </p>
            </div>
            <button className="bg-white text-[#B77466] hover:bg-[#FFE1AF] font-semibold py-3 px-8 rounded-xl transition duration-200 shadow-md whitespace-nowrap">
              Learn More →
            </button>
          </div>
        </div>

        {/* Trust Badges Row */}
        <div className="flex flex-wrap justify-center items-center gap-8 mt-12 opacity-70">
          <div className="flex items-center gap-2">
            <span className="text-green-600 text-xl">✓</span>
            <span className="text-gray-500 text-sm">GDPR Compliant</span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 text-xl">✓</span>
            <span className="text-gray-500 text-sm">SSL Encrypted</span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 text-xl">✓</span>
            <span className="text-gray-500 text-sm">Cruelty-Free</span>
          </div>
          <div className="w-px h-4 bg-gray-300"></div>
          <div className="flex items-center gap-2">
            <span className="text-green-600 text-xl">✓</span>
            <span className="text-gray-500 text-sm">Carbon Neutral</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSection;