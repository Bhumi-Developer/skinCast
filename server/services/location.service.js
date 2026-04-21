import axios from "axios";

export const getCoordinates = async (city) => {
  const res = await axios.get(
    `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${process.env.WEATHER_API_KEY}`
  );

  return {
    lat: res.data[0].lat,
    lon: res.data[0].lon,
  };
};