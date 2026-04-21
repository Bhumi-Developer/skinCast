import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  // ⏳ wait until auth check completes
  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  // ❌ not logged in → redirect
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // ✅ logged in → allow access
  return children;
};

export default ProtectedRoute;