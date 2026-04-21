import React from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MyAnalysis from './MyAnalysis';
import Dashboard from './Dashboard';
import MyRoutine from './MyRoutine';
import Settings from './Settings';
import ProfileLayout from './ProfileLayout';
import SavedProducts from './SavedProducts';

const MyProfile = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userProfile');
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <Routes>
      <Route path="/" element={<ProfileLayout onLogout={handleLogout} />}>
        <Route index element={<Dashboard />} />
        <Route path="saved" element={<SavedProducts />} />
        <Route path="routine" element={<MyRoutine />} />
        <Route path="analysis" element={<MyAnalysis />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default MyProfile;