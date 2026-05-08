import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { toast } from 'sonner';
import { useAnalysis } from '../context/AnalysisContext';

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { analysis, fetchAnalysis } = useAnalysis();
  const weather = analysis?.weather;

  useEffect(() => {
    if (user && !analysis) fetchAnalysis();
  }, [user, analysis]);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setIsProfileOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'My Profile', path: '/profile' },
    { name: 'About Us', path: '/about' },
  ];

  const handleSignOut = async () => {
    try {
      await logout();
      setIsProfileOpen(false);
      toast.success('Logged out');
      navigate('/login');
    } catch (err) {
      toast.error(err.message || 'Logout failed');
    }
  };

  const handleLinkClick = () => {
    setIsProfileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className="w-full bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 md:h-20">

          {/* Logo */}
          <NavLink
            to="/"
            onClick={handleLinkClick}
            className="flex items-center space-x-2 sm:space-x-3 group cursor-pointer shrink-0"
          >
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-primary to-primary-middle rounded-xl flex items-center justify-center shadow-md transition-all duration-300 group-hover:shadow-lg group-hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <span className="text-lg sm:text-xl md:text-2xl font-bold text-gray-800">
              Skin<span className="text-primary">Cast</span>
            </span>
          </NavLink>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={handleLinkClick}
                className={({ isActive }) =>
                  `relative px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 group ${
                    isActive ? 'text-primary' : 'text-gray-600 hover:text-primary'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-6 h-0.5 bg-primary rounded-full" />}
                    <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary rounded-full transition-all duration-300 group-hover:w-6 ${isActive ? 'hidden' : ''}`} />
                  </>
                )}
              </NavLink>
            ))}
          </div>

          {/* Right side */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Weather badge — desktop only */}
            {weather && (
              <div className="hidden md:flex items-center space-x-2 bg-linear-to-r from-primary-dull/40 to-white px-2 md:px-3 py-1.5 rounded-full border border-primary-dull shadow-sm">
                <span className="text-sm">🌡️</span>
                <span className="text-xs text-gray-700 font-medium">
                  {weather?.temp ? Math.round(weather.temp) : '--'}°C • {weather.condition}
                </span>
              </div>
            )}

            {/* Not logged in */}
            {!user ? (
              <button
                onClick={() => navigate('/login')}
                className="relative overflow-hidden bg-linear-to-r from-primary to-[#C48476] hover:from-primary-light hover:to-primary text-white font-semibold py-1.5 px-3 sm:py-2 sm:px-4 md:px-5 lg:px-6 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg transform hover:scale-105 active:scale-95 text-sm sm:text-base whitespace-nowrap"
              >
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 bg-white opacity-0 hover:opacity-20 transition-opacity duration-300" />
              </button>
            ) : (
              /* Profile button — same button on both mobile & desktop,
                 but the dropdown content differs */
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="flex items-center space-x-1 sm:space-x-2 focus:outline-none group"
                >
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-linear-to-br from-primary to-primary-middle rounded-full flex items-center justify-center shadow-md transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg">
                    <span className="text-white text-xs sm:text-sm font-semibold">
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </span>
                  </div>
                  <svg
                    className={`w-3 h-3 sm:w-4 sm:h-4 text-gray-600 transition-transform duration-300 ${isProfileOpen ? 'rotate-180' : ''}`}
                    fill="none" viewBox="0 0 24 24" stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 sm:w-64 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-fadeIn z-50">
                    {/* User info */}
                    <div className="p-3 sm:p-4 border-b border-gray-100">
                      <div className="flex items-center space-x-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-linear-to-br from-primary to-primary-middle rounded-full flex items-center justify-center shrink-0">
                          <span className="text-white font-semibold text-xs sm:text-sm">
                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                          </span>
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-semibold text-gray-800 truncate">{user.name}</p>
                          <p className="text-xs text-gray-500 truncate">{user.email}</p>
                        </div>
                      </div>
                    </div>

                    {/* Nav links — visible only on mobile */}
                    <div className="md:hidden py-1 border-b border-gray-100">
                      {navLinks.map((link) => (
                        <NavLink
                          key={link.path}
                          to={link.path}
                          onClick={handleLinkClick}
                          className={({ isActive }) =>
                            `flex items-center px-3 py-2.5 text-sm font-medium transition-colors duration-200 ${
                              isActive
                                ? 'text-primary bg-primary-dull/20'
                                : 'text-gray-700 hover:bg-primary-dull/20 hover:text-primary'
                            }`
                          }
                        >
                          {link.name}
                        </NavLink>
                      ))}
                    </div>

                    {/* Settings */}
                    <div className="py-1">
                      <NavLink
                        to="/profile/settings"
                        onClick={handleLinkClick}
                        className="flex items-center px-3 sm:px-4 py-2 text-xs sm:text-sm text-gray-700 hover:bg-primary-dull/30 hover:text-primary transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        Settings
                      </NavLink>
                    </div>

                    {/* Sign out */}
                    <div className="border-t border-gray-100 py-1">
                      <button
                        onClick={handleSignOut}
                        className="flex items-center w-full px-3 sm:px-4 py-2 text-xs sm:text-sm text-red-600 hover:bg-red-50 transition-colors duration-200"
                      >
                        <svg className="w-4 h-4 mr-3 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                        </svg>
                        Sign Out
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
      `}</style>
    </nav>
  );
};

export default Navbar;
