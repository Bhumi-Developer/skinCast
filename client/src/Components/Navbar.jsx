



// import React, { useState, useEffect } from 'react';
// import { NavLink, useLocation } from 'react-router-dom';
// import { useAppContext } from '../context/AppContext';

// const Navbar = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const { user, setShowUserLogin, setUser } = useAppContext();
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const location = useLocation();

//   // Scroll to top (0,0) on every route change
//   useEffect(() => {
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   }, [location.pathname]);

//   const navLinks = [
//     { name: 'Home', path: '/' },
//     { name: 'Weather Sync', path: '/weather' },
//     { name: 'Smart Routines', path: '/routines' },
//     { name: 'My Profile', path: '/profile' },
//     { name: 'Analysis',  }
//   ];

//   const handleSignOut = () => {
//     setUser(null);
//     setIsProfileOpen(false);
//   };

//   // Helper to close mobile menu and scroll to top
//   const handleLinkClick = () => {
//     setIsMenuOpen(false);
//     // Scroll will be handled by useEffect, but we ensure it's immediate
//     window.scrollTo({ top: 0, behavior: 'smooth' });
//   };

//   return (
//     <nav className="w-full bg-white shadow-md sticky top-0 z-50">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex justify-between items-center h-16 md:h-20">
          
//           {/* Logo Section - scroll to top on click */}
//           <NavLink 
//             to="/" 
//             onClick={handleLinkClick}
//             className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer flex-shrink-0"
//           >
//             <div className="relative">
//               <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#B77466] to-[#E2B59A] rounded-xl flex items-center justify-center shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
//                 <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
//                 </svg>
//               </div>
//             </div>
//             <div>
//               <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
//                 Skin<span className="text-[#B77466]">Sync</span>
//               </span>
//             </div>
//           </NavLink>

//           {/* Desktop Navigation Links - with scroll to top */}
//           <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
//             {navLinks.map((link) => (
//               <NavLink
//                 key={link.path}
//                 to={link.path}
//                 onClick={handleLinkClick}
//                 className={({ isActive }) =>
//                   `relative px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
//                     isActive
//                       ? 'text-[#B77466]'
//                       : 'text-gray-600 hover:text-[#B77466]'
//                   }`
//                 }
//               >
//                 {({ isActive }) => (
//                   <>
//                     {link.name}
//                     {isActive && (
//                       <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-[#B77466] rounded-full"></span>
//                     )}
//                     <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#B77466] rounded-full transition-all duration-300 group-hover:w-6 ${isActive ? 'hidden' : ''}`}></span>
//                   </>
//                 )}
//               </NavLink>
//             ))}
//           </div>

//           {/* Right side buttons */}
//           <div className="flex items-center space-x-2 sm:space-x-3">
//             {/* Weather indicator */}
//             <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-[#FFE1AF]/40 to-white px-2 md:px-3 py-1.5 rounded-full border border-[#FFE1AF] shadow-sm">
//               <span className="text-sm">☀️</span>
//               <span className="text-xs text-gray-700 font-medium hidden md:inline">24°C • Sunny</span>
//               <span className="text-xs text-gray-700 font-medium md:hidden">24°C</span>
//             </div>

//             {!user ? (
//               <button 
//                 onClick={() => setShowUserLogin(true)}
//                 className="relative overflow-hidden bg-gradient-to-r from-[#B77466] to-[#C48476] hover:from-[#957C62] hover:to-[#B77466] text-white font-semibold py-1.5 px-3 sm:py-2 sm:px-4 md:px-5 lg:px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 text-sm sm:text-base whitespace-nowrap"
//               >
//                 <span className="relative z-10">Sign In</span>
//                 <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
//               </button>
//             ) : (
//               <>
//                 <NavLink
//                   to="/get-started"
//                   onClick={handleLinkClick}
//                   className="relative overflow-hidden bg-gradient-to-r from-[#B77466] to-[#C48476] hover:from-[#957C62] hover:to-[#B77466] text-white font-semibold py-1.5 px-3 sm:py-2 sm:px-4 md:px-5 lg:px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 text-sm sm:text-base whitespace-nowrap inline-block"
//                 >
//                   <span className="relative z-10">Get Started</span>
//                   <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
//                 </NavLink>

//                 {/* Profile Section */}
//                 <div className="relative">
//                   <button
//                     onClick={() => setIsProfileOpen(!isProfileOpen)}
//                     className="flex items-center space-x-1 sm:space-x-2 focus:outline-none group"
//                   >
//                     <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#B77466] to-[#E2B59A] rounded-full flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
//                       <span className="text-white text-xs sm:text-sm font-semibold">JD</span>
//                     </div>
//                     <svg 
//                       className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-600 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`}
//                       fill="none" 
//                       viewBox="0 0 24 24" 
//                       stroke="currentColor"
//                     >
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
//                     </svg>
//                   </button>

//                   {isProfileOpen && (
//                     <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-fadeIn z-50">
//                       <div className="p-3 sm:p-4 border-b border-gray-100">
//                         <div className="flex items-center space-x-3">
//                           <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#B77466] to-[#E2B59A] rounded-full flex items-center justify-center flex-shrink-0">
//                             <span className="text-white font-semibold text-xs sm:text-sm">JD</span>
//                           </div>
//                           <div className="min-w-0">
//                             <p className="text-sm font-semibold text-gray-800 truncate">John Doe</p>
//                             <p className="text-xs text-gray-500 truncate">john.doe@example.com</p>
//                           </div>
//                         </div>
//                       </div>
                      
//                       <div className="py-2">
//                         <NavLink to="/profile" onClick={handleLinkClick} className="flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-[#FFE1AF]/30 hover:text-[#B77466] transition-colors duration-200">
//                           <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
//                           </svg>
//                           My Profile
//                         </NavLink>
//                         {/* <NavLink to="/routines" onClick={handleLinkClick} className="flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-[#FFE1AF]/30 hover:text-[#B77466] transition-colors duration-200">
//                           <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                           </svg>
//                           My Routines
//                         </NavLink> */}
//                         <NavLink to="/profile/settings" onClick={handleLinkClick} className="flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-[#FFE1AF]/30 hover:text-[#B77466] transition-colors duration-200">
//                           <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                           </svg>
//                           Settings
//                         </NavLink>
//                       </div>
                      
//                       <div className="border-t border-gray-100 py-2">
//                         <button 
//                           onClick={handleSignOut}
//                           className="flex items-center w-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
//                         >
//                           <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
//                           </svg>
//                           Sign Out
//                         </button>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               </>
//             )}

//             {/* Mobile menu button */}
//             <button
//               onClick={() => setIsMenuOpen(!isMenuOpen)}
//               className="md:hidden p-1.5 sm:p-2 rounded-lg text-gray-600 hover:text-[#B77466] hover:bg-[#FFE1AF]/50 transition-all duration-300"
//             >
//               <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 {isMenuOpen ? (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
//                 ) : (
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
//                 )}
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* Mobile Navigation Menu */}
//         {isMenuOpen && (
//           <div className="md:hidden py-4 border-t border-gray-100 bg-white">
//             <div className="flex flex-col space-y-2">
//               {navLinks.map((link) => (
//                 <NavLink
//                   key={link.path}
//                   to={link.path}
//                   onClick={handleLinkClick}
//                   className={({ isActive }) =>
//                     `px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
//                       isActive
//                         ? 'text-[#B77466] bg-[#FFE1AF]/50'
//                         : 'text-gray-600 hover:text-[#B77466] hover:bg-[#FFE1AF]/30'
//                     }`
//                   }
//                 >
//                   {link.name}
//                 </NavLink>
//               ))}
              
//               {/* Mobile Auth Section */}
//               <div className="pt-3 px-4 border-t border-gray-100 mt-2 space-y-3">
//                 {!user ? (
//                   <button 
//                     onClick={() => {
//                       setShowUserLogin(true);
//                       setIsMenuOpen(false);
//                     }}
//                     className="w-full bg-gradient-to-r from-[#B77466] to-[#C48476] text-white font-semibold py-3 rounded-xl text-center transition-all duration-300 hover:shadow-md"
//                   >
//                     Sign In
//                   </button>
//                 ) : (
//                   <>
//                     <NavLink
//                       to="/get-started"
//                       onClick={handleLinkClick}
//                       className="w-full bg-gradient-to-r from-[#B77466] to-[#C48476] text-white font-semibold py-3 rounded-xl text-center block transition-all duration-300 hover:shadow-md"
//                     >
//                       Get Started
//                     </NavLink>
//                     <button 
//                       onClick={handleSignOut}
//                       className="w-full text-red-600 font-medium text-base py-3 transition-colors duration-300 border border-red-200 rounded-xl hover:bg-red-50"
//                     >
//                       Sign Out
//                     </button>
//                   </>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       <style>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//             transform: translateY(-10px);
//           }
//           to {
//             opacity: 1;
//             transform: translateY(0);
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//       `}</style>
//     </nav>
//   );
// };

// export default Navbar;








import React, { useState, useEffect } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom'; // added useNavigate
import { useAppContext } from '../context/AppContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, setShowUserLogin, setUser } = useAppContext();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate(); // for programmatic navigation

  // Scroll to top on every route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Weather Sync', path: '/weather' },
    { name: 'Smart Routines', path: '/routines' },
    { name: 'My Profile', path: '/profile' },
    { name: 'Analysis', path: '/analysis' }   // fixed missing path
  ];

  const handleSignOut = () => {
    setUser(null);
    setIsProfileOpen(false);
  };

  // Helper to close mobile menu and scroll to top
  const handleLinkClick = () => {
    setIsMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Protected profile click handler
  const handleProfileClick = (e, linkPath) => {
    if (!user) {
      e.preventDefault(); // stop navigation
      alert('🔐 Please sign in to view your profile.');
      setShowUserLogin(true); // opens the login modal
      setIsMenuOpen(false);
      setIsProfileOpen(false);
      return false;
    }
    // if logged in, proceed normally
    handleLinkClick();
    navigate(linkPath);
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">
          
          {/* Logo Section */}
          <NavLink 
            to="/" 
            onClick={handleLinkClick}
            className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer flex-shrink-0"
          >
            <div className="relative">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#B77466] to-[#E2B59A] rounded-xl flex items-center justify-center shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                </svg>
              </div>
            </div>
            <div>
              <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
                Skin<span className="text-[#B77466]">Sync</span>
              </span>
            </div>
          </NavLink>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => {
              // Special handling for "My Profile" link
              if (link.path === '/profile') {
                return (
                  <button
                    key={link.path}
                    onClick={(e) => handleProfileClick(e, link.path)}
                    className={`relative px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                      location.pathname === '/profile'
                        ? 'text-[#B77466]'
                        : 'text-gray-600 hover:text-[#B77466]'
                    }`}
                  >
                    {link.name}
                    {location.pathname === '/profile' && (
                      <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-[#B77466] rounded-full"></span>
                    )}
                  </button>
                );
              }
              // Normal NavLink for other pages
              return (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={handleLinkClick}
                  className={({ isActive }) =>
                    `relative px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                      isActive
                        ? 'text-[#B77466]'
                        : 'text-gray-600 hover:text-[#B77466]'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-6 h-0.5 bg-[#B77466] rounded-full"></span>
                      )}
                      <span className={`absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-0.5 bg-[#B77466] rounded-full transition-all duration-300 group-hover:w-6 ${isActive ? 'hidden' : ''}`}></span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </div>

          {/* Right side buttons */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Weather indicator */}
            <div className="hidden sm:flex items-center space-x-2 bg-gradient-to-r from-[#FFE1AF]/40 to-white px-2 md:px-3 py-1.5 rounded-full border border-[#FFE1AF] shadow-sm">
              <span className="text-sm">☀️</span>
              <span className="text-xs text-gray-700 font-medium hidden md:inline">24°C • Sunny</span>
              <span className="text-xs text-gray-700 font-medium md:hidden">24°C</span>
            </div>

            {!user ? (
              <button 
                onClick={() => setShowUserLogin(true)}
                className="relative overflow-hidden bg-gradient-to-r from-[#B77466] to-[#C48476] hover:from-[#957C62] hover:to-[#B77466] text-white font-semibold py-1.5 px-3 sm:py-2 sm:px-4 md:px-5 lg:px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 text-sm sm:text-base whitespace-nowrap"
              >
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
              </button>
            ) : (
              <>
                <NavLink
                  to="/get-started"
                  onClick={handleLinkClick}
                  className="relative overflow-hidden bg-gradient-to-r from-[#B77466] to-[#C48476] hover:from-[#957C62] hover:to-[#B77466] text-white font-semibold py-1.5 px-3 sm:py-2 sm:px-4 md:px-5 lg:px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 text-sm sm:text-base whitespace-nowrap inline-block"
                >
                  <span className="relative z-10">Get Started</span>
                  <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                </NavLink>

                {/* Profile Dropdown (only visible when logged in) */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-1 sm:space-x-2 focus:outline-none group"
                  >
                    <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gradient-to-br from-[#B77466] to-[#E2B59A] rounded-full flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
                      <span className="text-white text-xs sm:text-sm font-semibold">JD</span>
                    </div>
                    <svg 
                      className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-600 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`}
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>

                  {isProfileOpen && (
                    <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-fadeIn z-50">
                      <div className="p-3 sm:p-4 border-b border-gray-100">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-[#B77466] to-[#E2B59A] rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-white font-semibold text-xs sm:text-sm">JD</span>
                          </div>
                          <div className="min-w-0">
                            <p className="text-sm font-semibold text-gray-800 truncate">John Doe</p>
                            <p className="text-xs text-gray-500 truncate">john.doe@example.com</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="py-2">
                        {/* This profile link is inside logged-in dropdown, so no extra protection needed */}
                        <NavLink to="/profile" onClick={handleLinkClick} className="flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-[#FFE1AF]/30 hover:text-[#B77466] transition-colors duration-200">
                          <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                          My Profile
                        </NavLink>
                        <NavLink to="/profile/settings" onClick={handleLinkClick} className="flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-[#FFE1AF]/30 hover:text-[#B77466] transition-colors duration-200">
                          <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          Settings
                        </NavLink>
                      </div>
                      
                      <div className="border-t border-gray-100 py-2">
                        <button 
                          onClick={handleSignOut}
                          className="flex items-center w-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                        >
                          <svg className="w-4 h-4 mr-3 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                          </svg>
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-1.5 sm:p-2 rounded-lg text-gray-600 hover:text-[#B77466] hover:bg-[#FFE1AF]/50 transition-all duration-300"
            >
              <svg className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100 bg-white">
            <div className="flex flex-col space-y-2">
              {navLinks.map((link) => {
                // Protect the "My Profile" link in mobile menu too
                if (link.path === '/profile') {
                  return (
                    <button
                      key={link.path}
                      onClick={(e) => handleProfileClick(e, link.path)}
                      className={`px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 text-left ${
                        location.pathname === '/profile'
                          ? 'text-[#B77466] bg-[#FFE1AF]/50'
                          : 'text-gray-600 hover:text-[#B77466] hover:bg-[#FFE1AF]/30'
                      }`}
                    >
                      {link.name}
                    </button>
                  );
                }
                return (
                  <NavLink
                    key={link.path}
                    to={link.path}
                    onClick={handleLinkClick}
                    className={({ isActive }) =>
                      `px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                        isActive
                          ? 'text-[#B77466] bg-[#FFE1AF]/50'
                          : 'text-gray-600 hover:text-[#B77466] hover:bg-[#FFE1AF]/30'
                      }`
                    }
                  >
                    {link.name}
                  </NavLink>
                );
              })}
              
              {/* Mobile Auth Section */}
              <div className="pt-3 px-4 border-t border-gray-100 mt-2 space-y-3">
                {!user ? (
                  <button 
                    onClick={() => {
                      setShowUserLogin(true);
                      setIsMenuOpen(false);
                    }}
                    className="w-full bg-gradient-to-r from-[#B77466] to-[#C48476] text-white font-semibold py-3 rounded-xl text-center transition-all duration-300 hover:shadow-md"
                  >
                    Sign In
                  </button>
                ) : (
                  <>
                    <NavLink
                      to="/get-started"
                      onClick={handleLinkClick}
                      className="w-full bg-gradient-to-r from-[#B77466] to-[#C48476] text-white font-semibold py-3 rounded-xl text-center block transition-all duration-300 hover:shadow-md"
                    >
                      Get Started
                    </NavLink>
                    <button 
                      onClick={handleSignOut}
                      className="w-full text-red-600 font-medium text-base py-3 transition-colors duration-300 border border-red-200 rounded-xl hover:bg-red-50"
                    >
                      Sign Out
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </nav>
  );
};

export default Navbar;