import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/axios";

const AnalysisContext = createContext();

export const AnalysisProvider = ({ children }) => {
  const [analysis, setAnalysis] = useState(() => {
    // 🔥 Load from localStorage on first render
    const saved = localStorage.getItem("analysis");
    return saved ? JSON.parse(saved) : null;
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchAnalysis = async (profileData) => {
    try {
      setLoading(true);
      setError(null);

      const res = await api.post("/api/recommendation/analyze", profileData);
      const result = res.data;

      const formatted = {
        location: result.location || profileData.location || "Unknown",
        weather: {
          temp: result.weather?.temp || 0,
          humidity: result.weather?.humidity || 0,
          condition: result.weather?.condition || "N/A",
          uvi: result.weather?.uvi || 0,
        },
        aqi: result.aqi || 0,
        recommendation: result.recommendation || {},
        products: result.products || [],
        searchQuery: result.searchQuery || "",
      };

      setAnalysis(formatted);

      // 🔥 SAVE HERE
      localStorage.setItem("analysis", JSON.stringify(formatted));

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnalysisContext.Provider value={{ analysis, loading, error, fetchAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  );
};

export const useAnalysis = () => useContext(AnalysisContext);