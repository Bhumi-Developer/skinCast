import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import api from "../utils/axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ------------------ GET CURRENT USER ------------------ */
  const fetchUser = async () => {
    try {
      const res = await api.get("/api/user/me");
      setUser(res.data.user);
    } catch (err) {
      setUser(null);
      // ❌ no toast here (avoid spam on refresh)
    } finally {
      setLoading(false);
    }
  };

  /* ------------------ SIGNUP ------------------ */
  const signup = async ({ name, email, password }) => {
    try {
      const res = await api.post("/api/auth/signUp", {
        name,
        email,
        password,
      });

      setUser(res.data.user);
      toast.success("Account created successfully 🎉");

      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.message || "Signup failed";

      toast.error(message);

      return {
        success: false,
        message,
      };
    }
  };

  /* ------------------ SIGNIN ------------------ */
  const signin = async ({ email, password }) => {
    try {
      const res = await api.post("/api/auth/signIn", {
        email,
        password,
      });

      setUser(res.data.user);
      toast.success("Welcome back 👋");

      return { success: true };
    } catch (err) {
      const message =
        err.response?.data?.message || "Login failed";

      toast.error(message);

      return {
        success: false,
        message,
      };
    }
  };

  /* ------------------ LOGOUT ------------------ */
  const logout = async () => {
    try {
      await api.post("/api/auth/signOut");

      setUser(null);
      toast.success("Logged out successfully 👋");
    } catch (err) {
      toast.error("Logout failed");
      console.log("Logout error:", err.message);
    }
  };

  /* ------------------ INIT ------------------ */
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signup,
        signin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

/* ------------------ CUSTOM HOOK ------------------ */
export const useAuth = () => useContext(AuthContext);