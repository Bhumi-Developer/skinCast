import axios from "axios";

export const getWeather = async (location) => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${process.env.WEATHER_API_KEY}&units=metric`
  );

  return {
    temp: res.data.main.temp,
    humidity: res.data.main.humidity,
    condition: res.data.weather[0].main,
  };
};

export const getForecast = async (location) => {
  const res = await axios.get(
    `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${process.env.WEATHER_API_KEY}&units=metric`
  );

  return res.data.list.slice(0, 5);
};