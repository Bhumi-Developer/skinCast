import React, { useEffect, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const ProfileLayout = ({ onLogout }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navigate = useNavigate();

  const menuItems = [
    { id: 'saved', label: 'Saved Products', icon: '💾', path: '/profile/saved' },
    { id: 'routine', label: 'My Routine', icon: '📋', path: '/profile/routine' },
    { id: 'analysis', label: 'Analysis', icon: '📈', path: '/profile/analysis' },
    { id: 'settings', label: 'Settings', icon: '⚙️', path: '/profile/settings' },
  ];

  const handleLogout = () => {
    onLogout();
    navigate('/');
  };

  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  return (
    <div className="relative min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Global Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Profile background"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dull/10 via-white/5 to-primary-light/10 backdrop-blur-[1px]"></div>
      </div>

      {/* Mobile Top Bar */}
      <div className="relative z-30 md:hidden flex items-center justify-between p-4 border-b border-white/30 bg-white/30 backdrop-blur-md">
        <button
          type="button"
          onClick={() => setMobileOpen(true)}
          className="w-10 h-10 rounded-xl bg-white/40 text-primary flex items-center justify-center hover:bg-primary/20 transition-all duration-300 shadow-sm hover:shadow-md"
          aria-label="Open menu"
        >
          ☰
        </button>
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-2xl bg-primary/20 p-2 rounded-xl">🌸</span>
          <span className="font-bold text-xl text-primary tracking-tight truncate">
            GlowGuide
          </span>
        </div>
        <div className="w-10" />
      </div>

      {/* Desktop Sticky Sidebar */}
      <div
        className={`relative z-20 hidden md:flex md:h-screen md:sticky md:top-0 transition-all duration-500 ease-in-out flex-col bg-white/30 backdrop-blur-md border-r border-white/40 shadow-[8px_0_24px_rgba(0,0,0,0.05)] ${
          collapsed ? "w-20" : "w-72"
        }`}
      >
        <div className="p-5 flex items-center justify-between border-b border-white/30">
          {!collapsed && (
            <div className="flex items-center gap-3">
              <span className="text-3xl bg-primary/20 p-2 rounded-xl">🌸</span>
              <span className="font-bold text-2xl text-primary tracking-tight">
                GlowGuide
              </span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="w-9 h-9 rounded-xl bg-white/40 text-primary flex items-center justify-center hover:bg-primary/20 transition-all duration-300 shadow-sm hover:shadow-md"
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            {collapsed ? "→" : "←"}
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                  isActive
                    ? "bg-primary text-white shadow-lg shadow-primary/20"
                    : "text-gray-700 hover:bg-white/40 hover:shadow-sm"
                } ${collapsed ? "justify-center" : ""}`
              }
            >
              <span className="text-2xl transition-transform group-hover:scale-110">
                {item.icon}
              </span>
              {!collapsed && (
                <span className="font-medium text-base">{item.label}</span>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Profile Summary (non‑collapsible footer) */}
        {/* {!collapsed && (
          <div className="p-4 border-t border-white/30">
            <div className="flex items-center gap-3 bg-white/30 rounded-xl p-3">
              <div className="w-10 h-10 rounded-full bg-primary/30 flex items-center justify-center text-primary text-xl">
                👤
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-gray-800 truncate">
                  {JSON.parse(localStorage.getItem('userProfile'))?.name || 'Glow User'}
                </p>
                <p className="text-xs text-primary-light truncate">
                  {JSON.parse(localStorage.getItem('userProfile'))?.skinType || 'Skin type not set'}
                </p>
              </div>
            </div>
          </div>
        )} */}

        {/* Logout Button */}
        <div className="p-4 border-t border-white/30">
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50/60 hover:text-red-600 transition-all duration-300 ${
              collapsed ? 'justify-center' : ''
            }`}
          >
            <span className="text-2xl">🚪</span>
            {!collapsed && <span className="font-medium text-base">Logout</span>}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Sidebar */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[80] md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-[82%] max-w-[320px] bg-white/70 backdrop-blur-md border-r border-white/40 shadow-2xl flex flex-col">
            <div className="p-5 flex items-center justify-between border-b border-white/30">
              <div className="flex items-center gap-3">
                <span className="text-3xl bg-primary/20 p-2 rounded-xl">🌸</span>
                <span className="font-bold text-2xl text-primary tracking-tight">
                  GlowGuide
                </span>
              </div>
              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="w-9 h-9 rounded-xl bg-white/40 text-primary flex items-center justify-center hover:bg-primary/20 transition-all duration-300 shadow-sm hover:shadow-md"
                aria-label="Close menu"
              >
                ✕
              </button>
            </div>

            <nav className="flex-1 p-4 space-y-2 overflow-y-auto">
              {menuItems.map((item) => (
                <NavLink
                  key={item.id}
                  to={item.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center gap-4 px-4 py-3 rounded-xl transition-all duration-300 group ${
                      isActive
                        ? "bg-primary text-white shadow-lg shadow-primary/20"
                        : "text-gray-700 hover:bg-white/40 hover:shadow-sm"
                    }`
                  }
                >
                  <span className="text-2xl transition-transform group-hover:scale-110">
                    {item.icon}
                  </span>
                  <span className="font-medium text-base">{item.label}</span>
                </NavLink>
              ))}
            </nav>

            <div className="p-4 border-t border-white/30">
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-4 px-4 py-3 rounded-xl text-gray-700 hover:bg-red-50/60 hover:text-red-600 transition-all duration-300"
              >
                <span className="text-2xl">🚪</span>
                <span className="font-medium text-base">Logout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Scrollable Main Content */}
      <div className="relative z-10 flex-1 overflow-y-auto md:h-screen">
        <div className="p-4 sm:p-6 md:p-8">
          <div className="bg-white/20 backdrop-blur-sm rounded-3xl p-4 sm:p-6 shadow-xl border border-white/30 min-h-[calc(100vh-7rem)] md:min-h-[calc(100vh-4rem)] overflow-x-hidden">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileLayout;