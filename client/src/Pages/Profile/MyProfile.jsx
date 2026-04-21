import React from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import MyAnalysis from './MyAnalysis';
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
        <Route index element={<Navigate to="saved" replace />} />
        <Route path="saved" element={<SavedProducts />} />
        <Route path="my-routine" element={<MyRoutine />} />
        <Route path="analysis" element={<MyAnalysis />} />
        <Route path="settings" element={<Settings />} />
      </Route>
    </Routes>
  );
};

export default MyProfile;