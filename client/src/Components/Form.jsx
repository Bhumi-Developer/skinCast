// Form.jsx
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/axios';
import { toast } from 'sonner';
import { useAnalysis } from '../context/AnalysisContext';

function Form({ onComplete }) {
  const navigate = useNavigate();
  const { fetchAnalysis, loading } = useAnalysis();
  // 👈 Profile data from backend (read-only reference)
  const [savedProfile, setSavedProfile] = useState(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  
  // 👈 Form state that can be modified (separate from saved profile)
  const [formData, setFormData] = useState({
    location: '',
    skinType: '',
    budget: '',
    concerns: [],
    category: '',
    productGoal: [],
    gender: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isFormDirty, setIsFormDirty] = useState(false); // 👈 Track if user made changes

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
  const validCategories = ['hair care', 'skin care'];

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

  // Fetch saved profile on mount
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/api/user/profile");
        console.log("Profile response:", res.data);
        
        const profileData = res.data.data || res.data;
        
        if (profileData) {
          // Safely parse arrays
          let concernsArray = [];
          let productGoalArray = [];
          
          if (profileData.concerns) {
            if (Array.isArray(profileData.concerns)) {
              concernsArray = profileData.concerns;
            } else if (typeof profileData.concerns === 'string') {
              concernsArray = profileData.concerns.split(',').map(c => c.trim());
            }
          }
          
          if (profileData.productGoal) {
            if (Array.isArray(profileData.productGoal)) {
              productGoalArray = profileData.productGoal;
            } else if (typeof profileData.productGoal === 'string') {
              productGoalArray = profileData.productGoal.split(',').map(g => g.trim());
            }
          } else if (profileData.productGoals) {
            if (Array.isArray(profileData.productGoals)) {
              productGoalArray = profileData.productGoals;
            } else if (typeof profileData.productGoals === 'string') {
              productGoalArray = profileData.productGoals.split(',').map(g => g.trim());
            }
          }
          
          const profile = {
            location: profileData.location || '',
            skinType: profileData.skinType || '',
            budget: profileData.budget || '',
            concerns: concernsArray,
            category: profileData.category || '',
            productGoal: productGoalArray,
            gender: profileData.gender || ''
          };
          
          setSavedProfile(profile);
          setFormData(profile); // 👈 Initialize form with saved profile
        }
      } catch (err) {
        console.error("Profile fetch error:", err);
        toast.error(err.message || "Something went wrong");
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  const validateField = (name, value) => {
    let error = '';
    
    if (name === 'concerns' || name === 'productGoals' || name === 'productGoal') {
      return '';
    }
    
    if (!value || (typeof value === 'string' && value.trim() === '')) {
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
    setFormData(prev => ({ ...prev, [name]: value }));
    setIsFormDirty(true); // 👈 Mark as dirty when user makes changes
    
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const selectOption = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    setIsFormDirty(true); // 👈 Mark as dirty
    if (field === 'skinType') setShowSkinType(false);
    if (field === 'category') setShowCategory(false);
  };

  const handleConcernToggle = (concernValue) => {
    setFormData(prev => {
      const currentConcerns = prev.concerns || [];
      const updated = currentConcerns.includes(concernValue)
        ? currentConcerns.filter(c => c !== concernValue)
        : [...currentConcerns, concernValue];
      return { ...prev, concerns: updated };
    });
    setIsFormDirty(true); // 👈 Mark as dirty
  };

  const handleGoalToggle = (goalValue) => {
    setFormData(prev => {
      const currentGoals = prev.productGoal || [];
      const updated = currentGoals.includes(goalValue)
        ? currentGoals.filter(g => g !== goalValue)
        : [...currentGoals, goalValue];
      return { ...prev, productGoal: updated };
    });
    setIsFormDirty(true); // 👈 Mark as dirty
  };

  const addCustomConcern = () => {
    if (customConcern.trim()) {
      const currentConcerns = formData.concerns || [];
      if (!currentConcerns.includes(customConcern.trim())) {
        setFormData(prev => ({ 
          ...prev, 
          concerns: [...(prev.concerns || []), customConcern.trim()] 
        }));
        setCustomConcern('');
        setIsAddingCustomConcern(false);
        setIsFormDirty(true); // 👈 Mark as dirty
      }
    }
  };

  const addCustomGoal = () => {
    if (customGoal.trim()) {
      const currentGoals = formData.productGoal || [];
      if (!currentGoals.includes(customGoal.trim())) {
        setFormData(prev => ({ 
          ...prev, 
          productGoal: [...(prev.productGoal || []), customGoal.trim()] 
        }));
        setCustomGoal('');
        setIsAddingCustomGoal(false);
        setIsFormDirty(true); // 👈 Mark as dirty
      }
    }
  };

  const validateAll = () => {
    const newErrors = {};
    const requiredFields = ['location', 'skinType', 'budget', 'gender', 'category'];
    
    requiredFields.forEach(field => {
      const error = validateField(field, formData[field]);
      if (error) newErrors[field] = error;
    });
    
    if (!formData.concerns || !Array.isArray(formData.concerns) || formData.concerns.length === 0) {
      newErrors.concerns = 'Select at least one skin concern';
    }
    if (!formData.productGoal || !Array.isArray(formData.productGoal) || formData.productGoal.length === 0) {
      newErrors.productGoal = 'Select at least one skincare goal';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 👈 Handle Analysis - Uses current form data but DOES NOT save to profile


const handleAnalysisClick = async () => {
  const allTouched = {};
  ['location', 'skinType', 'budget', 'gender', 'category', 'concerns', 'productGoal'].forEach(key => {
    allTouched[key] = true;
  });
  setTouched(allTouched);

  if (!validateAll()) return;

  try {
    await fetchAnalysis(formData); // ✅ send updated data
    navigate('/analysis');         // ✅ go after data is ready
  } catch (err) {
    console.error(err);
  }
};

  // 👈 Handle Save to Profile - Explicit save action
  const handleSaveToProfile = async () => {
    if (validateAll()) {
      try {
        const profileData = {
          location: formData.location,
          skinType: formData.skinType,
          budget: formData.budget,
          concerns: formData.concerns,
          category: formData.category,
          productGoal: formData.productGoal,
          gender: formData.gender
        };
        
        await api.post('/api/user/profile', profileData);
        setSavedProfile(formData); // Update saved profile reference
        setIsFormDirty(false);
        toast.success("Profile saved successfully!");
      } catch (error) {
        toast.error("Failed to save profile");
      }
    }
  };

  // 👈 Handle Reset to Saved Profile
  // const handleResetToSaved = () => {
  //   if (savedProfile) {
  //     setFormData(savedProfile);
  //     setIsFormDirty(false);
  //     toast.info("Reset to saved profile");
  //   }
  // };

 const handleRoutineClick = () => {
   const allTouched = {};
  ['location', 'skinType', 'budget', 'gender', 'category', 'concerns', 'productGoal'].forEach(key => {
    allTouched[key] = true;
  });
  setTouched(allTouched);

  if (!validateAll()) return;

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

  const categories = [
    { value: 'skin care', label: 'Skin Care', desc: 'Face, body, and general skincare' },
    { value: 'hair care', label: 'Hair Care', desc: 'Shampoo, conditioner, hair treatments' }
  ];

  const goalsList = [
    { value: 'facewash', category: 'skincare', desc: 'Cleansing' },
  { value: 'serum', category: 'skincare', desc: 'Treatment' },
  { value: 'moisturizer', category: 'skincare', desc: 'Hydration' },
  { value: 'sunscreen', category: 'skincare', desc: 'Protection' },
  { value: 'lipbalm', category: 'skincare', desc: 'Lip care' },
  { value: 'shampoo', category: 'haircare', desc: 'Cleansing' },
  { value: 'conditioner', category: 'haircare', desc: 'Smoothing' },
  { value: 'hair-mask', category: 'haircare', desc: 'Repair' },
  ];

  // Loading state
  if (loadingProfile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-primary">Loading your profile...</p>
        </div>
      </div>
    );
  }

  // Render functions for safe array mapping
  const renderConcerns = () => {
    const concerns = formData.concerns || [];
    if (concerns.length > 0) {
      return concerns.map(concern => (
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
      ));
    }
    return <span className="text-gray-500 text-sm">Select your skin concerns</span>;
  };

  const renderGoals = () => {
    const goals = formData.productGoal || [];
    if (goals.length > 0) {
      return goals.map(goal => (
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
      ));
    }
    return <span className="text-gray-500 text-sm">Select your skincare goals</span>;
  };

// const [formData, setFormData] = useState({
//   skinType: '',
//   concerns: '',
//   location: ''
// });

// useEffect(() => {
//   const profile = JSON.parse(localStorage.getItem("userProfile"));

//   if (profile) {
//     setFormData(profile); // 👈 prefill
//   }
// }, []);

// const handleChange = (e) => {
//   setFormData({
//     ...formData,
//     [e.target.name]: e.target.value
//   });
// };

// const { fetchAnalysis, setAnalysis } = useAnalysis();

const handleSubmit = async () => {
  try {
    setAnalysis(null); // clear old data

    await fetchAnalysis(formData); // fetch with UPDATED form

    navigate('/analysis');
  } catch (err) {
    console.error(err);
    toast.error("Failed to fetch analysis");
  }
};

  return (
    <div className="bg-linear-to-br from-primary-dull/20 via-white to-primary-light/20 py-6 px-3 scrollbar-hidden">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-primary-dull/40 p-5">
          <div className="text-center mb-5">
            <h2 className="text-3xl font-bold text-primary tracking-tight">
              ✨ Complete Your Profile
            </h2>
            <p className="text-primary-light mt-1 text-base">
              Personalize your skincare journey
            </p>
            {isFormDirty && (
              <div className="mt-2 text-xs text-amber-600 bg-amber-50 inline-block px-3 py-1 rounded-full">
                ⚡ You have unsaved changes
              </div>
            )}
          </div>

          <form onSubmit={(e) => e.preventDefault()} className="space-y-4" noValidate>
            {/* Form fields - same as before but using formData instead of profile */}
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
                    value={formData.location}
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
                      <span className={formData.skinType ? 'text-gray-700' : 'text-gray-500'}>
                        {formData.skinType || 'Select your skin type'}
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
                            onClick={() => {
                              if (customSkinType.trim()) {
                                selectOption('skinType', customSkinType.trim());
                                setCustomSkinType('');
                                setIsAddingSkinType(false);
                                setShowSkinType(false);
                              }
                            }}
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

                {/* Budget */}
                <div data-error={!!errors.budget}>
                  <label className="block text-primary font-semibold mb-1 text-base">
                    💰 What's your budget? (₹)
                  </label>
                  <input
                    type="number"
                    name="budget"
                    value={formData.budget}
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
                          formData.gender === g
                            ? 'border-primary bg-primary-dull/30 shadow-sm'
                            : 'border-primary-dull/40 bg-white/50 hover:border-primary-light'
                        }`}
                      >
                        <input
                          type="radio"
                          name="gender"
                          value={g}
                          checked={formData.gender === g}
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
                {/* Category Dropdown */}
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
                      <span className={formData.category ? 'text-gray-700' : 'text-gray-500'}>
                        {formData.category ? formData.category.charAt(0).toUpperCase() + formData.category.slice(1) : 'Select category'}
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
                      {renderConcerns()}
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
                            checked={(formData.concerns || []).includes(concern.value)}
                            onChange={() => handleConcernToggle(concern.value)}
                            className="mr-3 w-4 h-4 accent-primary rounded"
                          />
                          <div>
                            <div className="font-medium text-gray-800 text-sm">{concern.label}</div>
                            <div className="text-xs text-primary-light">{concern.desc}</div>
                          </div>
                        </label>
                      ))}
                      {(formData.concerns || []).filter(c => !concernsList.some(item => item.value === c)).map(custom => (
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
                <div ref={goalsRef} className="relative" data-error={!!errors.productGoal}>
                  <label className="block text-primary font-semibold mb-1 text-base">
                    🏆 What are your skincare goals?
                  </label>
                  <div
                    onClick={() => setShowGoals(!showGoals)}
                    className={`w-full px-4 py-2.5 border-2 rounded-xl bg-white/80 cursor-pointer hover:border-primary transition-all ${
                      errors.productGoal && touched.productGoal ? 'border-red-400' : 'border-primary-dull/50'
                    }`}
                  >
                    <div className="flex flex-wrap gap-1.5 items-center">
                      {renderGoals()}
                      <span className="ml-auto text-primary text-base">{showGoals ? '▲' : '▼'}</span>
                    </div>
                  </div>
                  {errors.productGoal && touched.productGoal && (
                    <p className="text-red-500 text-xs mt-0.5 ml-1">{errors.productGoal}</p>
                  )}
                  {showGoals && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-white/95 backdrop-blur-sm border border-primary-dull/40 rounded-xl shadow-lg z-20 max-h-60 overflow-y-auto py-1">
                      {goalsList.map(goal => (
                        <label key={goal.value} className="flex items-center px-4 py-2 hover:bg-primary-dull/20 cursor-pointer transition-colors">
                          <input
                            type="checkbox"
                            checked={(formData.productGoal || []).includes(goal.value)}
                            onChange={() => handleGoalToggle(goal.value)}
                            className="mr-3 w-4 h-4 accent-primary rounded"
                          />
                          <div>
                            <div className="font-medium text-gray-800 text-sm">{goal.label}</div>
                            <div className="text-xs text-primary-light">{goal.desc}</div>
                          </div>
                        </label>
                      ))}
                      {(formData.productGoal || []).filter(g => !goalsList.some(item => item.value === g)).map(custom => (
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

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-3 pt-4">
              <button
                type="button"
                disabled={loading}
                onClick={handleAnalysisClick}
                className="flex-1 bg-linear-to-r from-primary to-primary-light text-white py-2.5 rounded-xl font-bold text-base shadow-md hover:shadow-lg hover:scale-[1.01] transition-all duration-300"
              >
                {loading ? "📊 Analysing.." :
                "📊 Analyze with Current Data"
                }
              </button>
              
              <button
                type="button"
                onClick={handleRoutineClick}
                className="flex-1 bg-primary-dull text-primary border-2 border-primary/30 py-2.5 rounded-xl font-bold text-base shadow-sm hover:bg-primary/10 hover:border-primary transition-all duration-300"
              >
                📋 Routine
              </button>
            </div>

            {/* Save/Reset Buttons - Only show when form is dirty */}
            {/* {isFormDirty && (
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleSaveToProfile}
                  className="flex-1 bg-green-500 text-white py-2 rounded-xl font-semibold text-sm hover:bg-green-600 transition-all duration-300"
                >
                  💾 Save to Profile
                </button>
                <button
                  type="button"
                  onClick={handleResetToSaved}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-xl font-semibold text-sm hover:bg-gray-400 transition-all duration-300"
                >
                  ↺ Reset to Saved
                </button>
              </div>
            )} */}
          </form>
        </div>
      </div>

      <style global>{`
        .scrollbar-hidden {
          overflow-y: auto;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }
        .scrollbar-hidden::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}

export default Form;