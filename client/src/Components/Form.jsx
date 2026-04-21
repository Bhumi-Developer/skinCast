import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Form({ onComplete }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    location: '',
    skinType: '',
    budget: '',
    concerns: [],
    category: '',
    productGoals: [],
    gender: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  // Dropdown visibility states
  const [showSkinType, setShowSkinType] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
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

  // Refs for outside click
  const skinTypeRef = useRef(null);
  const categoryRef = useRef(null);
  const concernsRef = useRef(null);
  const goalsRef = useRef(null);

  // Predefined valid values
  const validSkinTypes = ['dry', 'oily', 'combination', 'normal', 'sensitive'];
  const validCategories = ['hair care', 'skin care']; // Only two options

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (skinTypeRef.current && !skinTypeRef.current.contains(e.target)) {
        setShowSkinType(false);
        setIsAddingSkinType(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(e.target)) {
        setShowCategory(false);
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
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const validateField = (name, value) => {
    let error = '';
    if (!value && name !== 'concerns' && name !== 'productGoals') {
      error = 'This field is required';
    } else {
      switch (name) {
        case 'location':
          if (value.length < 2) error = 'Please enter a valid city name';
          break;
        case 'skinType':
          if (!validSkinTypes.includes(value.toLowerCase()) && value.trim() !== '') {
            error = 'We recommend choosing from the list, but you can use your own';
          }
          break;
        case 'category':
          if (!validCategories.includes(value.toLowerCase()) && value.trim() !== '') {
            error = 'Category must be "hair care" or "skin care"';
          }
          break;
        case 'gender':
          if (!['female', 'male'].includes(value.toLowerCase())) {
            error = 'Please select Female or Male';
          }
          break;
        case 'budget':
          if (isNaN(value) || Number(value) <= 0) {
            error = 'Please enter a valid budget amount';
          }
          break;
        default:
          break;
      }
    }
    return error;
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const selectOption = (field, value) => {
    setProfile(prev => ({ ...prev, [field]: value }));
    if (field === 'skinType') setShowSkinType(false);
    if (field === 'category') setShowCategory(false);
  };

  const addCustomOption = (field, customValue, setCustom, setIsAdding, setShow) => {
    if (customValue.trim()) {
      setProfile(prev => ({ ...prev, [field]: customValue.trim() }));
      setCustom('');
      setIsAdding(false);
      setShow(false);
    }
  };

  const handleConcernToggle = (concernValue) => {
    setProfile(prev => {
      const updated = prev.concerns.includes(concernValue)
        ? prev.concerns.filter(c => c !== concernValue)
        : [...prev.concerns, concernValue];
      return { ...prev, concerns: updated };
    });
  };

  const handleGoalToggle = (goalValue) => {
    setProfile(prev => {
      const updated = prev.productGoals.includes(goalValue)
        ? prev.productGoals.filter(g => g !== goalValue)
        : [...prev.productGoals, goalValue];
      return { ...prev, productGoals: updated };
    });
  };

  const addCustomConcern = () => {
    if (customConcern.trim() && !profile.concerns.includes(customConcern.trim())) {
      setProfile(prev => ({ ...prev, concerns: [...prev.concerns, customConcern.trim()] }));
      setCustomConcern('');
      setIsAddingCustomConcern(false);
    }
  };

  const addCustomGoal = () => {
    if (customGoal.trim() && !profile.productGoals.includes(customGoal.trim())) {
      setProfile(prev => ({ ...prev, productGoals: [...prev.productGoals, customGoal.trim()] }));
      setCustomGoal('');
      setIsAddingCustomGoal(false);
    }
  };

  const validateAll = () => {
    const newErrors = {};
    // Required fields: location, skinType, budget, gender, category
    const requiredFields = ['location', 'skinType', 'budget', 'gender', 'category'];
    requiredFields.forEach(field => {
      const error = validateField(field, profile[field]);
      if (error) newErrors[field] = error;
    });
    if (profile.concerns.length === 0) newErrors.concerns = 'Select at least one skin concern';
    if (profile.productGoals.length === 0) newErrors.productGoals = 'Select at least one skincare goal';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAnalysisClick = () => {
    // Mark all fields as touched to show errors
    const allTouched = {};
    ['location', 'skinType', 'budget', 'gender', 'category', 'concerns', 'productGoals'].forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    if (validateAll()) {
      // Save profile to localStorage (optional, for use in analysis page)
      localStorage.setItem('userProfile', JSON.stringify(profile));
      if (onComplete) onComplete(profile);
      navigate('/analysis');
    } else {
      const firstError = document.querySelector('[data-error="true"]');
      if (firstError) firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleRoutineClick = () => {
    navigate('/routine');
  };

  // Options lists
  const skinTypes = [
    { value: 'dry', label: 'Dry Skin', desc: 'Tight, flaky, rough' },
    { value: 'oily', label: 'Oily Skin', desc: 'Shiny, large pores' },
    { value: 'combination', label: 'Combination Skin', desc: 'Oily T-zone, dry cheeks' },
    { value: 'normal', label: 'Normal Skin', desc: 'Balanced, few issues' },
    { value: 'sensitive', label: 'Sensitive Skin', desc: 'Reactive, easily irritated' }
  ];

  const concernsList = [
    { value: 'acne', label: 'Acne', desc: 'Pimples, breakouts' },
    { value: 'aging', label: 'Anti-Aging', desc: 'Wrinkles, fine lines' },
    { value: 'pigmentation', label: 'Pigmentation', desc: 'Dark spots, uneven tone' },
    { value: 'dryness', label: 'Dryness', desc: 'Dehydrated, flaky' },
    { value: 'oiliness', label: 'Oiliness', desc: 'Excess sebum' },
    { value: 'dullness', label: 'Dullness', desc: 'Lack of glow' }
  ];

  // Only two categories
  const categories = [
    { value: 'skin care', label: 'Skin Care', desc: 'Face, body, and general skincare' },
    { value: 'hair care', label: 'Hair Care', desc: 'Shampoo, conditioner, hair treatments' }
  ];

  const goalsList = [
    { value: 'hydration', label: 'Hydration', desc: 'Plump, dewy skin' },
    { value: 'brightening', label: 'Brightening', desc: 'Even, glowing skin' },
    { value: 'firming', label: 'Firming', desc: 'Tight, lifted skin' },
    { value: 'soothing', label: 'Soothing', desc: 'Calm, less redness' },
    { value: 'protection', label: 'Protection', desc: 'Barrier repair' },
    { value: 'clear-skin', label: 'Clear Skin', desc: 'Acne-free' }
  ];

  return (
    <div className="bg-gradient-to-br from-primary-dull/20 via-white to-primary-light/20 py-6 px-3 scrollbar-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-primary-dull/40 p-5">
          <div className="text-center mb-5">
            <h2 className="text-3xl font-bold text-primary tracking-tight">
              ✨ Complete Your Profile
            </h2>
            <p className="text-primary-light mt-1 text-base">
              Personalize your skincare journey
            </p>
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4" noValidate>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* LEFT COLUMN */}
              <div className="space-y-4">
                {/* Location */}
                <div data-error={!!errors.location}>
                  <label className="block text-primary font-semibold mb-1 text-base">
                    📍 Where do you live?
                  </label>
                  <input
                    type="text"
                    name="location"
                    value={profile.location}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    placeholder="e.g., Mumbai, Delhi"
                    className={`w-full px-4 py-2.5 border-2 rounded-xl bg-white/80 focus:outline-none focus:ring-2 transition-all text-gray-700 placeholder:text-primary-light/60 text-sm ${
                      errors.location && touched.location
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                        : 'border-primary-dull/50 focus:border-primary focus:ring-primary-dull/50'
                    }`}
                  />
                  {errors.location && touched.location && (
                    <p className="text-red-500 text-xs mt-0.5 ml-1">{errors.location}</p>
                  )}
                </div>

                {/* Skin Type Dropdown */}
                <div ref={skinTypeRef} className="relative" data-error={!!errors.skinType}>
                  <label className="block text-primary font-semibold mb-1 text-base">
                    🧴 What's your skin type?
                  </label>
                  <div
                    onClick={() => setShowSkinType(!showSkinType)}
                    className={`w-full px-4 py-2.5 border-2 rounded-xl bg-white/80 cursor-pointer hover:border-primary transition-all ${
                      errors.skinType && touched.skinType ? 'border-red-400' : 'border-primary-dull/50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className={profile.skinType ? 'text-gray-700' : 'text-gray-500'}>
                        {profile.skinType || 'Select your skin type'}
                      </span>
                      <span className="text-primary text-base">{showSkinType ? '▲' : '▼'}</span>
                    </div>
                  </div>
                  {errors.skinType && touched.skinType && (
                    <p className="text-red-500 text-xs mt-0.5 ml-1">{errors.skinType}</p>
                  )}
                  {showSkinType && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white/95 backdrop-blur-sm border border-primary-dull/40 rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto py-1">
                      {skinTypes.map(type => (
                        <div
                          key={type.value}
                          onClick={() => selectOption('skinType', type.value)}
                          className="px-4 py-2 hover:bg-primary-dull/20 cursor-pointer transition-colors"
                        >
                          <div className="font-medium text-gray-800 text-sm">{type.label}</div>
                          <div className="text-xs text-primary-light">{type.desc}</div>
                        </div>
                      ))}
                      {isAddingSkinType ? (
                        <div className="px-4 py-2 flex gap-2">
                          <input
                            type="text"
                            value={customSkinType}
                            onChange={(e) => setCustomSkinType(e.target.value)}
                            placeholder="e.g., Acne-prone"
                            className="flex-1 px-3 py-1.5 border border-primary-dull rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50 text-sm"
                            autoFocus
                          />
                          <button
                            type="button"
                            onClick={() => addCustomOption('skinType', customSkinType, setCustomSkinType, setIsAddingSkinType, setShowSkinType)}
                            className="bg-primary text-white px-3 py-1 rounded-lg text-xs hover:bg-primary-light transition"
                          >
                            Add
                          </button>
                          <button
                            type="button"
                            onClick={() => { setIsAddingSkinType(false); setCustomSkinType(''); }}
                            className="text-gray-500 hover:text-gray-700 text-xs"
                          >
                            Cancel
                          </button>
                        </div>
                      ) : (
                        <button
                          type="button"
                          onClick={() => setIsAddingSkinType(true)}
                          className="w-full text-left px-4 py-1.5 text-primary hover:bg-primary-dull/20 transition-colors text-xs flex items-center gap-1 border-t border-primary-dull/20 mt-1"
                        >
                          <span>➕</span> Add custom skin type
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Budget – Number Input */}
                <div data-error={!!errors.budget}>
                  <label className="block text-primary font-semibold mb-1 text-base">
                    💰 What's your budget? (₹)
                  </label>
                  <input
                    type="number"
                    name="budget"
                    value={profile.budget}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    required
                    min={0}
                    max={100000}
                    step={100}
                    placeholder="Enter amount"
                    className={`w-full px-4 py-2.5 border-2 rounded-xl bg-white/80 focus:outline-none focus:ring-2 transition-all text-gray-700 placeholder:text-primary-light/60 text-sm ${
                      errors.budget && touched.budget
                        ? 'border-red-400 focus:border-red-500 focus:ring-red-200'
                        : 'border-primary-dull/50 focus:border-primary focus:ring-primary-dull/50'
                    }`}
                  />
                  {errors.budget && touched.budget && (
                    <p className="text-red-500 text-xs mt-0.5 ml-1">{errors.budget}</p>
                  )}
                  <p className="text-xs text-primary-light mt-1">
                    Enter your preferred budget in rupees
                  </p>
                </div>

                {/* Gender */}
                <div data-error={!!errors.gender}>
                  <label className="block text-primary font-semibold mb-1 text-base">👤 Gender</label>
                  <div className="flex flex-wrap gap-3">
                    {['female', 'male'].map(g => (
                      <label
                        key={g}
                        className={`flex items-center gap-2 cursor-pointer px-4 py-2 rounded-xl border-2 transition-all ${
                          profile.gender === g
                            ? 'border-primary bg-primary-dull/30 shadow-sm'
                            : 'border-primary-dull/40 bg-white/50 hover:border-primary-light'
                        }`}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={profile.gender === g}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className="w-4 h-4 accent-primary"
                        />
                        <span className="text-base font-medium text-gray-700 capitalize">{g}</span>
                      </label>
                    ))}
                  </div>
                  {errors.gender && touched.gender && (
                    <p className="text-red-500 text-xs mt-0.5 ml-1">{errors.gender}</p>
                  )}
                </div>
              </div>

              {/* RIGHT COLUMN */}
              <div className="space-y-4">
                {/* Category Dropdown - Only Hair Care & Skin Care */}
                <div ref={categoryRef} className="relative" data-error={!!errors.category}>
                  <label className="block text-primary font-semibold mb-1 text-base">
                    🏷️ Product Category Preference
                  </label>
                  <div
                    onClick={() => setShowCategory(!showCategory)}
                    className={`w-full px-4 py-2.5 border-2 rounded-xl bg-white/80 cursor-pointer hover:border-primary transition-all ${
                      errors.category && touched.category ? 'border-red-400' : 'border-primary-dull/50'
                    }`}
                  >
                    <div className="flex items-center justify-between text-sm">
                      <span className={profile.category ? 'text-gray-700' : 'text-gray-500'}>
                        {profile.category ? profile.category.charAt(0).toUpperCase() + profile.category.slice(1) : 'Select category'}
                      </span>
                      <span className="text-primary text-base">{showCategory ? '▲' : '▼'}</span>
                    </div>
                  </div>
                  {errors.category && touched.category && (
                    <p className="text-red-500 text-xs mt-0.5 ml-1">{errors.category}</p>
                  )}
                  {showCategory && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white/95 backdrop-blur-sm border border-primary-dull/40 rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto py-1">
                      {categories.map(cat => (
                        <div
                          key={cat.value}
                          onClick={() => selectOption('category', cat.value)}
                          className="px-4 py-2 hover:bg-primary-dull/20 cursor-pointer transition-colors"
                        >
                          <div className="font-medium text-gray-800 text-sm">{cat.label}</div>
                          <div className="text-xs text-primary-light">{cat.desc}</div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Skin Concerns */}
                <div ref={concernsRef} className="relative" data-error={!!errors.concerns}>
                  <label className="block text-primary font-semibold mb-1 text-base">
                    🎯 What are your main concerns?
                  </label>
                  <div
                    onClick={() => setShowConcerns(!showConcerns)}
                    className={`w-full px-4 py-2.5 border-2 rounded-xl bg-white/80 cursor-pointer hover:border-primary transition-all ${
                      errors.concerns && touched.concerns ? 'border-red-400' : 'border-primary-dull/50'
                    }`}
                  >
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {profile.concerns.length > 0 ? (
                        profile.concerns.map(concern => (
                          <span key={concern} className="bg-primary-dull/30 text-primary text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                            {concern}
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); handleConcernToggle(concern); }}
                              className="hover:text-red-500 ml-0.5"
                            >
                              ✕
                            </button>
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 text-sm">Select your skin concerns</span>
                      )}
                      <span className="ml-auto text-primary text-base">{showConcerns ? '▲' : '▼'}</span>
                    </div>
                  </div>
                  {errors.concerns && touched.concerns && (
                    <p className="text-red-500 text-xs mt-0.5 ml-1">{errors.concerns}</p>
                  )}
                  {showConcerns && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white/95 backdrop-blur-sm border border-primary-dull/40 rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto py-1">
                      {concernsList.map(concern => (
                        <label key={concern.value} className="flex items-center px-4 py-2 hover:bg-primary-dull/20 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={profile.concerns.includes(concern.value)}
                            onChange={() => handleConcernToggle(concern.value)}
                            className="mr-3 w-4 h-4 accent-primary rounded"
                          />
                          <div>
                            <div className="font-medium text-gray-800 text-sm">{concern.label}</div>
                            <div className="text-xs text-primary-light">{concern.desc}</div>
                          </div>
                        </label>
                      ))}
                      {profile.concerns.filter(c => !concernsList.some(item => item.value === c)).map(custom => (
                        <div key={custom} className="flex items-center justify-between px-4 py-2 bg-primary-dull/10">
                          <span className="font-medium text-gray-800 text-sm">{custom}</span>
                          <button type="button" onClick={() => handleConcernToggle(custom)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
                        </div>
                      ))}
                      {isAddingCustomConcern ? (
                        <div className="px-4 py-2 flex gap-2">
                          <input
                            type="text"
                            value={customConcern}
                            onChange={(e) => setCustomConcern(e.target.value)}
                            placeholder="e.g., Rosacea"
                            className="flex-1 px-3 py-1.5 border border-primary-dull rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50 text-sm"
                            autoFocus
                          />
                          <button type="button" onClick={addCustomConcern} className="bg-primary text-white px-3 py-1 rounded-lg text-xs hover:bg-primary-light transition">Add</button>
                          <button type="button" onClick={() => { setIsAddingCustomConcern(false); setCustomConcern(''); }} className="text-gray-500 hover:text-gray-700 text-xs">Cancel</button>
                        </div>
                      ) : (
                        <button type="button" onClick={() => setIsAddingCustomConcern(true)} className="w-full text-left px-4 py-1.5 text-primary hover:bg-primary-dull/20 transition-colors text-xs flex items-center gap-1 border-t border-primary-dull/20 mt-1">
                          <span>➕</span> Add custom concern
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {/* Product Goals */}
                <div ref={goalsRef} className="relative" data-error={!!errors.productGoals}>
                  <label className="block text-primary font-semibold mb-1 text-base">
                    🏆 What are your skincare goals?
                  </label>
                  <div
                    onClick={() => setShowGoals(!showGoals)}
                    className={`w-full px-4 py-2.5 border-2 rounded-xl bg-white/80 cursor-pointer hover:border-primary transition-all ${
                      errors.productGoals && touched.productGoals ? 'border-red-400' : 'border-primary-dull/50'
                    }`}
                  >
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {profile.productGoals.length > 0 ? (
                        profile.productGoals.map(goal => (
                          <span key={goal} className="bg-primary-dull/30 text-primary text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                            {goal}
                            <button
                              type="button"
                              onClick={(e) => { e.stopPropagation(); handleGoalToggle(goal); }}
                              className="hover:text-red-500 ml-0.5"
                            >
                              ✕
                            </button>
                          </span>
                        ))
                      ) : (
                        <span className="text-gray-500 text-sm">Select your skincare goals</span>
                      )}
                      <span className="ml-auto text-primary text-base">{showGoals ? '▲' : '▼'}</span>
                    </div>
                  </div>
                  {errors.productGoals && touched.productGoals && (
                    <p className="text-red-500 text-xs mt-0.5 ml-1">{errors.productGoals}</p>
                  )}
                  {showGoals && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white/95 backdrop-blur-sm border border-primary-dull/40 rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto py-1">
                      {goalsList.map(goal => (
                        <label key={goal.value} className="flex items-center px-4 py-2 hover:bg-primary-dull/20 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={profile.productGoals.includes(goal.value)}
                            onChange={() => handleGoalToggle(goal.value)}
                            className="mr-3 w-4 h-4 accent-primary rounded"
                          />
                          <div>
                            <div className="font-medium text-gray-800 text-sm">{goal.label}</div>
                            <div className="text-xs text-primary-light">{goal.desc}</div>
                          </div>
                        </label>
                      ))}
                      {profile.productGoals.filter(g => !goalsList.some(item => item.value === g)).map(custom => (
                        <div key={custom} className="flex items-center justify-between px-4 py-2 bg-primary-dull/10">
                          <span className="font-medium text-gray-800 text-sm">{custom}</span>
                          <button type="button" onClick={() => handleGoalToggle(custom)} className="text-red-400 hover:text-red-600 text-xs">✕</button>
                        </div>
                      ))}
                      {isAddingCustomGoal ? (
                        <div className="px-4 py-2 flex gap-2">
                          <input
                            type="text"
                            value={customGoal}
                            onChange={(e) => setCustomGoal(e.target.value)}
                            placeholder="e.g., Reduce redness"
                            className="flex-1 px-3 py-1.5 border border-primary-dull rounded-lg focus:outline-none focus:ring-1 focus:ring-primary/50 text-sm"
                            autoFocus
                          />
                          <button type="button" onClick={addCustomGoal} className="bg-primary text-white px-3 py-1 rounded-lg text-xs hover:bg-primary-light transition">Add</button>
                          <button type="button" onClick={() => { setIsAddingCustomGoal(false); setCustomGoal(''); }} className="text-gray-500 hover:text-gray-700 text-xs">Cancel</button>
                        </div>
                      ) : (
                        <button type="button" onClick={() => setIsAddingCustomGoal(true)} className="w-full text-left px-4 py-1.5 text-primary hover:bg-primary-dull/20 transition-colors text-xs flex items-center gap-1 border-t border-primary-dull/20 mt-1">
                          <span>➕</span> Add custom goal
                        </button>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Action Buttons - Only Analysis and Routine */}
            <div className="flex flex-wrap gap-3 pt-4">
              <button
                type="button"
                onClick={handleAnalysisClick}
                className="flex-1 bg-gradient-to-r from-primary to-primary-light text-white py-2.5 rounded-xl font-bold text-base shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
              >
                📊 Analysis
              </button>
              <button
                type="button"
                onClick={handleRoutineClick}
                className="flex-1 bg-primary-dull text-primary border-2 border-primary/30 py-2.5 rounded-xl font-bold text-base shadow-sm hover:bg-primary/10 hover:border-primary transition-all duration-300"
              >
                📋 Routine
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Style to hide scrollbar */}
      <style global>{`
        .scrollbar-hidden {
          overflow-y: auto;
          scrollbar-width: none; /* Firefox */
          -ms-overflow-style: none; /* IE/Edge */
        }
        .scrollbar-hidden::-webkit-scrollbar {
          display: none; /* Chrome, Safari, Opera */
        }
      `}</style>
    </div>
  );
}

export default Form;
