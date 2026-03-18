export const fetchWeatherByCity = async (city, unit = 'metric') => {
  const API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
  const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';

  if (!API_KEY) {
    throw new Error('API Key is missing. Please check your .env file.');
  }

  try {
    const response = await fetch(`${BASE_URL}?q=${city}&units=${unit}&appid=${API_KEY}`);
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('City not found. Please try again.');
      }
      throw new Error('Failed to fetch weather data.');
    }
    
    return await response.json();
  } catch (error) {
    throw error;
  }
};
