// services/aqiService.js
import axios from "axios";

export const getAQI = async ({ lat, lon }) => {
  try {
    const res = await axios.get(
      "http://api.airvisual.com/v2/nearest_city",
      {
        params: {
          lat,
          lon,
          key: process.env.AIRVISUAL_API_KEY,
        },
      }
    );

    const data = res.data.data;

    return {
      aqi: data.current.pollution.aqius,
      mainPollutant: data.current.pollution.mainus,
      temperature: data.current.weather.tp,
      humidity: data.current.weather.hu,
    };

  } catch (error) {
    console.log("AQI API Error:", error.message);
    return { aqi: 50 }; // fallback
  }
};