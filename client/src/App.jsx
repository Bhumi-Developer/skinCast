// App.jsx
import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Analyses from "./Pages/Analyses";
import Form from "./Components/Form"; // the form component you provided
import MoreProducts from "./Pages/MoreProducts";
import Explore from "./Components/Explore";
import ProtectedRoute from "./Components/ProtectedRoutes";
import MyProfile from "./Pages/Profile/MyProfile";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { Toaster } from "sonner";
import { useLocation } from "react-router-dom";
import Navbar from "./Components/Navbar";

const App = () => {

    const location = useLocation();
  const hideNavbarRoutes = ["/login", "/signup"];

const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);

  return (
    <div>
      <Toaster />
     {!shouldHideNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/profile-form" element={
          <Form onComplete={(profile) => {
          localStorage.setItem('userProfile', JSON.stringify(profile));
        }} />} /> */}
        <Route
          path="/profile-form"
          element={
            <ProtectedRoute>
              <Form />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analysis"
          element={
            <ProtectedRoute>
              <Analyses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <Explore />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile/*"
          element={
            <ProtectedRoute>
              <MyProfile />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
