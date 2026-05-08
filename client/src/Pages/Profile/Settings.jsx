import React, { useState, useRef, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/axios';
import { toast } from 'sonner';

const Settings = () => {
  const { user, loading: authLoading } = useAuth();

  const buildProfile = (u) => ({
    location: u?.location || '',
    skinType: u?.skinType || '',
    budget: u?.budget != null ? String(u.budget) : '',
    concerns: u?.concerns || [],
    productGoal: u?.productGoal || '',
    gender: u?.gender || '',
    category: u?.category || '',
  });

  const [profile, setProfile] = useState(() => buildProfile(null));
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);

  // Dropdown states
  const [showSkinType, setShowSkinType] = useState(false);
  const [showConcerns, setShowConcerns] = useState(false);
  const [showGoals, setShowGoals] = useState(false);

  // Custom value states
  const [customSkinType, setCustomSkinType] = useState('');
  const [customConcern, setCustomConcern] = useState('');
  const [customGoal, setCustomGoal] = useState('');

  // Add mode states
  const [isAddingSkinType, setIsAddingSkinType] = useState(false);
  const [isAddingCustomConcern, setIsAddingCustomConcern] = useState(false);
  const [isAddingCustomGoal, setIsAddingCustomGoal] = useState(false);

  const skinTypeRef = useRef(null);
  const concernsRef = useRef(null);
  const goalsRef = useRef(null);

  // Seed profile from auth user once loaded
  useEffect(() => {
    if (user) {
      setProfile(buildProfile(user));
    }
  }, [user]);

  // Options
  const skinTypesList = [
    { value: 'dry', label: 'Dry Skin', desc: 'Tight, flaky, rough' },
    { value: 'oily', label: 'Oily Skin', desc: 'Shiny, large pores' },
    { value: 'combination', label: 'Combination', desc: 'Oily T‑zone, dry cheeks' },
    { value: 'sensitive', label: 'Sensitive', desc: 'Reactive, easily irritated' },
  ];

  const concernsList = [
    { value: 'acne', label: 'Acne', desc: 'Pimples, breakouts' },
    { value: 'aging', label: 'Anti-Aging', desc: 'Wrinkles, fine lines' },
    { value: 'pigmentation', label: 'Pigmentation', desc: 'Dark spots, uneven tone' },
    { value: 'dryness', label: 'Dryness', desc: 'Dehydrated, flaky' },
    { value: 'oiliness', label: 'Oiliness', desc: 'Excess sebum' },
    { value: 'dullness', label: 'Dullness', desc: 'Lack of glow' },
  ];

  const goalsList = [
    { value: 'hydration', label: 'Hydration', desc: 'Plump, dewy skin' },
    { value: 'brightening', label: 'Brightening', desc: 'Even, glowing skin' },
    { value: 'firming', label: 'Firming', desc: 'Tight, lifted skin' },
    { value: 'soothing', label: 'Soothing', desc: 'Calm, less redness' },
    { value: 'protection', label: 'Protection', desc: 'Barrier repair' },
    { value: 'clear-skin', label: 'Clear Skin', desc: 'Acne-free' },
  ];

  const categoryOptions = [
    { value: 'skin care', label: 'Skin Care' },
    { value: 'hair care', label: 'Hair Care' },
  ];

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (skinTypeRef.current && !skinTypeRef.current.contains(e.target)) {
        setShowSkinType(false);
        setIsAddingSkinType(false);
      }
      if (concernsRef.current && !concernsRef.current.contains(e.target)) {
        setShowConcerns(false);
        setIsAddingCustomConcern(false);
      }
      if (goalsRef.current && !goalsRef.current.contains(e.target)) {
        setShowGoals(false);
        setIsAddingCustomGoal(false);
      }
    };
    if (isEditing) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleBudgetChange = (e) => {
    const value = e.target.value;
    if (value === '' || /^\d+$/.test(value)) {
      setProfile(prev => ({ ...prev, budget: value }));
    }
  };

  const incrementBudget = () => {
    const current = parseInt(profile.budget) || 0;
    setProfile(prev => ({ ...prev, budget: (current + 100).toString() }));
  };

  const decrementBudget = () => {
    const current = parseInt(profile.budget) || 0;
    const newVal = Math.max(0, current - 100);
    setProfile(prev => ({ ...prev, budget: newVal.toString() }));
  };

  const handleSkinTypeToggle = (value) => {
    setProfile(prev => ({ ...prev, skinType: value }));
    setShowSkinType(false);
  };

  const handleCategoryChange = (e) => {
    setProfile(prev => ({ ...prev, category: e.target.value }));
  };

  const handleConcernToggle = (concernValue) => {
    setProfile(prev => {
      const updated = prev.concerns.includes(concernValue)
        ? prev.concerns.filter(c => c !== concernValue)
        : [...prev.concerns, concernValue];
      return { ...prev, concerns: updated };
    });
  };

  // productGoal is a single string — clicking a goal selects/deselects it
  const handleGoalToggle = (goalValue) => {
    setProfile(prev => ({
      ...prev,
      productGoal: prev.productGoal === goalValue ? '' : goalValue,
    }));
  };

  const addCustomSkinType = () => {
    if (customSkinType.trim()) {
      setProfile(prev => ({ ...prev, skinType: customSkinType.trim() }));
      setCustomSkinType('');
      setIsAddingSkinType(false);
      setShowSkinType(false);
    }
  };

  const addCustomConcern = () => {
    if (customConcern.trim() && !profile.concerns.includes(customConcern.trim())) {
      setProfile(prev => ({ ...prev, concerns: [...prev.concerns, customConcern.trim()] }));
      setCustomConcern('');
      setIsAddingCustomConcern(false);
    }
  };

  const addCustomGoal = () => {
    if (customGoal.trim()) {
      setProfile(prev => ({ ...prev, productGoal: customGoal.trim() }));
      setCustomGoal('');
      setIsAddingCustomGoal(false);
      setShowGoals(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        location: profile.location,
        skinType: profile.skinType,
        budget: profile.budget !== '' ? Number(profile.budget) : null,
        concerns: profile.concerns,
        productGoal: profile.productGoal,
        gender: profile.gender,
        category: profile.category,
      };

      await api.put('/api/user/update-profile', payload);
      toast.success('Profile updated successfully ✅');
      setIsEditing(false);
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to update profile';
      toast.error(message);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setProfile(buildProfile(user));
    setIsEditing(false);
  };

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-primary text-lg">Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen overflow-y-auto overflow-x-hidden">
      {/* Background Image */}
      <div className="fixed inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/4041392/pexels-photo-4041392.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
          alt="Settings background"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dull/20 via-white/10 to-primary-light/20"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-3xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-primary">Settings</h1>
          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="bg-primary text-white px-5 py-2 rounded-xl shadow-md hover:shadow-lg transition-all"
            >
              ✏️ Edit Profile
            </button>
          ) : (
            <div className="flex gap-3">
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-primary text-white px-5 py-2 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-60"
              >
                {saving ? 'Saving...' : '💾 Save'}
              </button>
              <button
                onClick={handleCancel}
                disabled={saving}
                className="bg-primary-dull text-primary px-5 py-2 rounded-xl shadow-md hover:shadow-lg transition-all disabled:opacity-60"
              >
                Cancel
              </button>
            </div>
          )}
        </div>

        <div className="bg-white/40 backdrop-blur-sm rounded-3xl p-8 shadow-lg border border-white/30">
          <h2 className="text-2xl font-bold text-primary mb-8 pb-2 border-b border-primary-dull/40">
            Your Profile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Location */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <span className="text-xl">📍</span> Location
              </label>
              {isEditing ? (
                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  placeholder="e.g., Mumbai, Delhi"
                  className="w-full p-4 bg-white/60 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                />
              ) : (
                <div className="p-4 bg-white/40 rounded-xl">
                  <span className="text-primary font-semibold">{profile.location || '—'}</span>
                </div>
              )}
            </div>

            {/* Skin Type */}
            <div className="space-y-2" ref={skinTypeRef}>
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <span className="text-xl">🧴</span> Skin Type
              </label>
              {isEditing ? (
                <div className="relative">
                  <div
                    onClick={() => setShowSkinType(!showSkinType)}
                    className="w-full p-4 bg-white/60 rounded-xl shadow-inner cursor-pointer flex justify-between items-center"
                  >
                    <span className="text-gray-700">
                      {profile.skinType || 'Select skin type'}
                    </span>
                    <span className="text-primary text-xl">{showSkinType ? '▲' : '▼'}</span>
                  </div>
                  {showSkinType && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-primary-dull/40 rounded-xl shadow-xl z-50 max-h-60 overflow-y-auto py-2">
                      {skinTypesList.map(type => (
                        <div
                          key={type.value}
                          onClick={() => handleSkinTypeToggle(type.value)}
                          className="px-5 py-3 hover:bg-primary-dull/20 cursor-pointer transition-colors"
                        >
                          <div className="font-medium text-gray-800">{type.label}</div>
                          <div className="text-xs text-primary-light">{type.desc}</div>
                        </div>
                      ))}
                      {isAddingSkinType ? (
                        <div className="px-5 py-3 flex gap-2">
                          <input
                            type="text"
                            value={customSkinType}
                            onChange={(e) => setCustomSkinType(e.target.value)}
                            placeholder="e.g., Acne-prone"
                            className="flex-1 px-3 py-2 border border-primary-dull rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={addCustomSkinType}
                            className="bg-primary text-white px-3 py-1 rounded-lg text-sm"
                          >
                            Add
                          </button>
                          <button
                            type="button"
                            onClick={() => { setIsAddingSkinType(false); setCustomSkinType(''); }}
                            className="text-gray-500 hover:text-gray-700 text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsAddingSkinType(true)}
                          className="w-full text-left px-5 py-2 text-primary hover:bg-primary-dull/20 transition-colors text-sm flex items-center gap-2 border-t border-primary-dull/20 mt-1"
                        >
                          <span>➕</span> Add custom skin type
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-white/40 rounded-xl">
                  <span className="text-primary font-semibold capitalize">{profile.skinType || '—'}</span>
                </div>
              )}
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <span className="text-xl">🏷️</span> Category
              </label>
              {isEditing ? (
                <select
                  name="category"
                  value={profile.category}
                  onChange={handleCategoryChange}
                  className="w-full p-4 bg-white/60 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                >
                  <option value="">Select category</option>
                  {categoryOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
              ) : (
                <div className="p-4 bg-white/40 rounded-xl">
                  <span className="text-primary font-semibold capitalize">{profile.category || '—'}</span>
                </div>
              )}
            </div>

            {/* Budget */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <span className="text-xl">💰</span> Budget (₹)
              </label>
              {isEditing ? (
                <div className="relative">
                  <input
                    type="text"
                    inputMode="numeric"
                    pattern="\d*"
                    name="budget"
                    value={profile.budget}
                    onChange={handleBudgetChange}
                    placeholder="Enter amount"
                    className="w-full p-4 pr-20 bg-white/60 rounded-xl shadow-inner focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 flex gap-1">
                    <button
                      type="button"
                      onClick={decrementBudget}
                      className="w-8 h-8 bg-primary-dull/40 rounded-lg shadow-sm hover:shadow-md text-primary font-bold text-lg transition-all"
                    >
                      ↓
                    </button>
                    <button
                      type="button"
                      onClick={incrementBudget}
                      className="w-8 h-8 bg-primary-dull/40 rounded-lg shadow-sm hover:shadow-md text-primary font-bold text-lg transition-all"
                    >
                      ↑
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-white/40 rounded-xl">
                  <span className="text-primary font-semibold">
                    {profile.budget ? `₹${profile.budget}` : '—'}
                  </span>
                </div>
              )}
            </div>

            {/* Gender */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <span className="text-xl">👤</span> Gender
              </label>
              {isEditing ? (
                <div className="p-4 bg-white/60 rounded-xl shadow-inner">
                  <div className="flex flex-wrap gap-6">
                    {['Female', 'Male'].map(g => (
                      <label key={g} className="flex items-center gap-2 cursor-pointer">
                        <input
                          type="radio"
                          name="gender"
                          value={g.toLowerCase()}
                          checked={profile.gender === g.toLowerCase()}
                          onChange={handleChange}
                          className="w-5 h-5 accent-primary"
                        />
                        <span className="text-gray-700">{g}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="p-4 bg-white/40 rounded-xl">
                  <span className="text-primary font-semibold capitalize">{profile.gender || '—'}</span>
                </div>
              )}
            </div>

            {/* Concerns */}
            <div className="space-y-2 md:col-span-2" ref={concernsRef}>
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <span className="text-xl">🎯</span> Skin Concerns
              </label>
              {isEditing ? (
                <div className="relative">
                  <div
                    onClick={() => setShowConcerns(!showConcerns)}
                    className="w-full p-4 bg-white/60 rounded-xl shadow-inner cursor-pointer flex justify-between items-center"
                  >
                    <span className="text-gray-700">
                      {profile.concerns.length > 0
                        ? `${profile.concerns.length} selected`
                        : 'Select concerns'}
                    </span>
                    <span className="text-primary text-xl">{showConcerns ? '▲' : '▼'}</span>
                  </div>
                  {showConcerns && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-primary-dull/40 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto py-2">
                      {concernsList.map(concern => (
                        <label
                          key={concern.value}
                          className="flex items-center px-5 py-3 hover:bg-primary-dull/20 cursor-pointer transition-colors"
                        >
                          <input
                            type="checkbox"
                            checked={profile.concerns.includes(concern.value)}
                            onChange={() => handleConcernToggle(concern.value)}
                            className="mr-4 w-5 h-5 accent-primary rounded"
                          />
                          <div>
                            <div className="font-medium text-gray-800">{concern.label}</div>
                            <div className="text-xs text-primary-light">{concern.desc}</div>
                          </div>
                        </label>
                      ))}
                      {profile.concerns
                        .filter(c => !concernsList.some(item => item.value === c))
                        .map(custom => (
                          <div key={custom} className="flex items-center justify-between px-5 py-3 bg-primary-dull/10">
                            <span className="font-medium text-gray-800">{custom}</span>
                            <button
                              type="button"
                              onClick={() => handleConcernToggle(custom)}
                              className="text-red-400 hover:text-red-600"
                            >
                              ✕
                            </button>
                          </div>
                        ))}
                      {isAddingCustomConcern ? (
                        <div className="px-5 py-3 flex gap-2">
                          <input
                            type="text"
                            value={customConcern}
                            onChange={(e) => setCustomConcern(e.target.value)}
                            placeholder="e.g., Rosacea"
                            className="flex-1 px-3 py-2 border border-primary-dull rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={addCustomConcern}
                            className="bg-primary text-white px-3 py-1 rounded-lg text-sm"
                          >
                            Add
                          </button>
                          <button
                            type="button"
                            onClick={() => { setIsAddingCustomConcern(false); setCustomConcern(''); }}
                            className="text-gray-500 hover:text-gray-700 text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsAddingCustomConcern(true)}
                          className="w-full text-left px-5 py-2 text-primary hover:bg-primary-dull/20 transition-colors text-sm flex items-center gap-2 border-t border-primary-dull/20 mt-1"
                        >
                          <span>➕</span> Add custom concern
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
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
              )}
            </div>

            {/* Product Goal (single selection) */}
            <div className="space-y-2 md:col-span-2" ref={goalsRef}>
              <label className="flex items-center gap-2 text-gray-700 font-medium">
                <span className="text-xl">🏆</span> Skincare Goal
              </label>
              {isEditing ? (
                <div className="relative">
                  <div
                    onClick={() => setShowGoals(!showGoals)}
                    className="w-full p-4 bg-white/60 rounded-xl shadow-inner cursor-pointer flex justify-between items-center"
                  >
                    <span className="text-gray-700">
                      {profile.productGoal || 'Select a goal'}
                    </span>
                    <span className="text-primary text-xl">{showGoals ? '▲' : '▼'}</span>
                  </div>
                  {showGoals && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white/95 backdrop-blur-sm border border-primary-dull/40 rounded-xl shadow-xl z-50 max-h-64 overflow-y-auto py-2">
                      {goalsList.map(goal => (
                        <div
                          key={goal.value}
                          onClick={() => { handleGoalToggle(goal.value); setShowGoals(false); }}
                          className={`px-5 py-3 cursor-pointer transition-colors flex items-center justify-between ${
                            profile.productGoal === goal.value
                              ? 'bg-primary-dull/30'
                              : 'hover:bg-primary-dull/20'
                          }`}
                        >
                          <div>
                            <div className="font-medium text-gray-800">{goal.label}</div>
                            <div className="text-xs text-primary-light">{goal.desc}</div>
                          </div>
                          {profile.productGoal === goal.value && (
                            <span className="text-primary text-lg">✓</span>
                          )}
                        </div>
                      ))}
                      {isAddingCustomGoal ? (
                        <div className="px-5 py-3 flex gap-2">
                          <input
                            type="text"
                            value={customGoal}
                            onChange={(e) => setCustomGoal(e.target.value)}
                            placeholder="e.g., Reduce redness"
                            className="flex-1 px-3 py-2 border border-primary-dull rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={addCustomGoal}
                            className="bg-primary text-white px-3 py-1 rounded-lg text-sm"
                          >
                            Add
                          </button>
                          <button
                            type="button"
                            onClick={() => { setIsAddingCustomGoal(false); setCustomGoal(''); }}
                            className="text-gray-500 hover:text-gray-700 text-sm"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsAddingCustomGoal(true)}
                          className="w-full text-left px-5 py-2 text-primary hover:bg-primary-dull/20 transition-colors text-sm flex items-center gap-2 border-t border-primary-dull/20 mt-1"
                        >
                          <span>➕</span> Add custom goal
                        </button>
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <div className="p-4 bg-white/40 rounded-xl">
                  {profile.productGoal ? (
                    <span className="bg-primary-dull/40 text-primary px-3 py-1 rounded-full text-sm">
                      {profile.productGoal}
                    </span>
                  ) : (
                    <span className="text-primary-light">—</span>
                  )}
                </div>
              )}
            </div>
          </div>

          {!isEditing && (
            <p className="text-sm text-primary-light mt-6 text-center">
              Click "Edit Profile" to update your information.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Settings;
