import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const companyLinks = [
    { name: 'About Us', href: '#' },
    { name: 'How It Works', href: '#' },
    { name: 'Our Technology', href: '#' },
    { name: 'Meet the Team', href: '#' },
    { name: 'Blog', href: '#' }
  ];

  const featuresLinks = [
    { name: 'Weather Sync', href: '#' },
    { name: 'Skin Analysis', href: '#' },
    { name: 'Personalized Routines', href: '#' },
    { name: 'Product Recommendations', href: '#' },
    { name: 'Seasonal Guide', href: '#' }
  ];

  const resourcesLinks = [
    { name: 'Skincare Guide', href: '#' },
    { name: 'Ingredient Glossary', href: '#' },
    { name: 'Weather & Skin Science', href: '#' },
    { name: 'FAQ', href: '#' },
    { name: 'Help Center', href: '#' }
  ];

  const legalLinks = [
    { name: 'Privacy Policy', href: '#' },
    { name: 'Terms of Service', href: '#' },
    { name: 'Cookie Policy', href: '#' },
    { name: 'Accessibility', href: '#' }
  ];

  const socialPlatforms = [
    { 
      name: 'Instagram', 
      icon: 'Instagram', 
      href: '#', 
      username: '@skinsync_india',
      bgColor: 'hover:bg-gradient-to-tr from-purple-600 to-pink-600',
      description: 'Daily skincare tips & weather updates'
    },
    { 
      name: 'Facebook', 
      icon: 'Facebook', 
      href: '#', 
      username: '/skinsync.india',
      bgColor: 'hover:bg-blue-600',
      description: 'Community discussions & support'
    },
    { 
      name: 'Twitter', 
      icon: 'Twitter', 
      href: '#', 
      username: '@skinsync',
      bgColor: 'hover:bg-sky-500',
      description: 'Real-time weather alerts'
    },
    { 
      name: 'LinkedIn', 
      icon: 'LinkedIn', 
      href: '#', 
      username: 'company/skinsync',
      bgColor: 'hover:bg-blue-700',
      description: 'Professional skincare insights'
    },
    { 
      name: 'YouTube', 
      icon: 'YouTube', 
      href: '#', 
      username: '@SkinSync',
      bgColor: 'hover:bg-red-600',
      description: 'Skincare tutorials & guides'
    }
  ];

  return (
    <footer className="w-full bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-[#B77466] to-[#E2B59A] rounded-xl flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
              <span className="text-xl font-bold text-white">
                Skin<span className="text-[#B77466]">Sync</span>
              </span>
            </div>
            <p className="text-sm text-gray-400 mb-6 leading-relaxed">
              Your personal skincare companion that adapts to real-time weather conditions. Get customized routines based on your local climate and skin type.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-2">
              {companyLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-400 hover:text-[#B77466] transition-colors duration-200 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Features */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Features</h4>
            <ul className="space-y-2">
              {featuresLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-400 hover:text-[#B77466] transition-colors duration-200 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support & Resources */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Support</h4>
            <ul className="space-y-2">
              {resourcesLinks.map((link, idx) => (
                <li key={idx}>
                  <a href={link.href} className="text-gray-400 hover:text-[#B77466] transition-colors duration-200 text-sm">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info - India */}
          <div>
            <h4 className="text-white font-semibold text-lg mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3 text-sm">
                <svg className="w-4 h-4 text-[#B77466] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:hello@skinsync.com" className="text-gray-400 hover:text-[#B77466] transition-colors">
                  hello@skinsync.com
                </a>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <svg className="w-4 h-4 text-[#B77466] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+911234567890" className="text-gray-400 hover:text-[#B77466] transition-colors">
                  +91 12345 67890
                </a>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <svg className="w-4 h-4 text-[#B77466] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400">Mumbai, India</span>
              </li>
              <li className="flex items-start space-x-3 text-sm">
                <svg className="w-4 h-4 text-[#B77466] mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                <span className="text-gray-400">24/7 Live Chat Support</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Media Section - Professional without images
        <div className="border-t border-gray-800 pt-10 mb-8">
          <div className="text-center mb-8">
            <h4 className="text-white font-semibold text-xl mb-2">Connect With Us</h4>
            <p className="text-gray-400 text-sm max-w-md mx-auto">
              Follow us on social media for daily skincare tips, weather updates, and expert advice
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {socialPlatforms.map((platform, idx) => (
              <a
                key={idx}
                href={platform.href}
                className={`group relative overflow-hidden bg-gray-800/50 rounded-xl p-5 border border-gray-700 transition-all duration-300 hover:border-transparent ${platform.bgColor}`}
              >
                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <svg className="w-8 h-8 text-gray-400 group-hover:text-white transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d={getSocialIconPath(platform.icon)} clipRule="evenodd" />
                    </svg>
                    <span className="text-xs font-medium text-gray-500 group-hover:text-white/80 transition-colors">
                      Follow →
                    </span>
                  </div>
                  <h5 className="text-white font-semibold text-lg mb-1">{platform.name}</h5>
                  <p className="text-xs text-gray-500 group-hover:text-white/70 mb-2">{platform.username}</p>
                  <p className="text-xs text-gray-600 group-hover:text-white/50 line-clamp-1">
                    {platform.description}
                  </p>
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/0 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </a>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        {/* <div className="border-t border-gray-800 pt-8 mb-8">
          <div className="flex flex-wrap justify-center gap-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-xs text-gray-400">100% Data Privacy</span>
            </div>
            <div className="w-px h-4 bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span className="text-xs text-gray-400">Dermatologist Reviewed</span>
            </div>
            <div className="w-px h-4 bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs text-gray-400">Real-Time Weather Sync</span>
            </div>
            <div className="w-px h-4 bg-gray-700"></div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <span className="text-xs text-gray-400">Cruelty-Free</span>
            </div>
          </div>
        </div> */} 

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-400">
              © {currentYear} SkinSync. All rights reserved. Made with ❤️ in India
            </p>
            <div className="flex flex-wrap justify-center gap-4 md:gap-6">
              {legalLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.href}
                  className="text-xs text-gray-400 hover:text-[#B77466] transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Helper function for social media icons
// function getSocialIconPath(iconName) {
//   const icons = {
//     Instagram: "M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 011.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 01-1.153 1.772 4.915 4.915 0 01-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 01-1.772-1.153 4.904 4.904 0 01-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 011.153-1.772A4.897 4.897 0 015.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 5a5 5 0 100 10 5 5 0 000-10zm6.5-.25a1.25 1.25 0 10-2.5 0 1.25 1.25 0 002.5 0zM12 9a3 3 0 110 6 3 3 0 010-6z",
//     Facebook: "M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z",
//     Twitter: "M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 0021.34-11.36c0-.213-.005-.426-.015-.637a10.017 10.017 0 002.468-2.558z",
//     LinkedIn: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451c.979 0 1.771-.773 1.771-1.729V1.729C24 .774 23.204 0 22.225 0z",
//     YouTube: "M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
//   };
//   return icons[iconName] || "";
// }

export default Footer;