import React, { useState, useEffect } from 'react';

const Dashboard = () => {
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const savedProfile = JSON.parse(localStorage.getItem('userProfile')) || {};
    setProfile(savedProfile);
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Dashboard background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dull/20 via-white/10 to-primary-light/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-primary mb-8">Your Profile</h1>

        <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/30">
          <h2 className="text-2xl font-bold text-primary mb-8 pb-2 border-b border-primary-dull/40">
            Personal Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <span className="text-xl">📍</span> Location
              </label>
              <div className="p-4 bg-white/40 rounded-xl">
                <span className="text-primary font-semibold">{profile.location || '—'}</span>
              </div>
            </div>

            {/* Skin Type */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <span className="text-xl">🧴</span> Skin Type
              </label>
              <div className="p-4 bg-white/40 rounded-xl">
                <span className="text-primary font-semibold capitalize">{profile.skinType || '—'}</span>
              </div>
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <span className="text-xl">💰</span> Budget
              </label>
              <div className="p-4 bg-white/40 rounded-xl">
                <span className="text-primary font-semibold">₹{profile.budget || '—'}</span>
              </div>
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <span className="text-xl">🏷️</span> Category
              </label>
              <div className="p-4 bg-white/40 rounded-xl">
                <span className="text-primary font-semibold capitalize">{profile.category || '—'}</span>
              </div>
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <span className="text-xl">👤</span> Gender
              </label>
              <div className="p-4 bg-white/40 rounded-xl">
                <span className="text-primary font-semibold capitalize">{profile.gender || '—'}</span>
              </div>
            </div>

            {/* Concerns */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <span className="text-xl">🎯</span> Skin Concerns
              </label>
              <div className="p-4 bg-white/40 rounded-xl">
                {profile.concerns?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.concerns.map((c, i) => (
                      <span key={i} className="bg-primary-dull/40 text-primary px-3 py-1 rounded-full text-sm">
                        {c}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-primary-light">—</span>
                )}
              </div>
            </div>

            {/* Goals - Fixed: use productGoals */}
            <div className="space-y-2 md:col-span-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <span className="text-xl">🏆</span> Skincare Goals
              </label>
              <div className="p-4 bg-white/40 rounded-xl">
                {profile.productGoals?.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {profile.productGoals.map((g, i) => (
                      <span key={i} className="bg-primary-dull/40 text-primary px-3 py-1 rounded-full text-sm">
                        {g}
                      </span>
                    ))}
                  </div>
                ) : (
                  <span className="text-primary-light">—</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;