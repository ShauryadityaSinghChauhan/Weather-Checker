import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import RecentCities from './components/RecentCities';
import { CloudRain, Loader2 } from 'lucide-react';
import { fetchWeatherByCity } from './services/weatherApi';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric');
  const [recentCities, setRecentCities] = useState(() => {
    try {
      const saved = localStorage.getItem('recentCities');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('recentCities', JSON.stringify(recentCities));
  }, [recentCities]);

  useEffect(() => {
    if (!city) {
      setWeatherData(null);
      setError(null);
      return;
    }
    const getWeather = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchWeatherByCity(city, unit);
        setWeatherData(data);
        setRecentCities(prev => {
          const filtered = prev.filter(c => c.toLowerCase() !== city.toLowerCase());
          return [data.name || city, ...filtered].slice(0, 5);
        });
      } catch (err) {
        setError(err.message);
        setWeatherData(null);
      } finally {
        setLoading(false);
      }
    };
    getWeather();
  }, [city, unit]);

  const handleSearch = (searchedCity) => {
    if(searchedCity.trim() !== '') setCity(searchedCity);
  };

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
  };

  const toggleUnit = () => {
    setUnit(prev => prev === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="app-container animate-fade-in" style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <header className="flex-center flex-column" style={{ marginBottom: '2rem' }}>
        <div className="flex-center" style={{ gap: '0.5rem', marginBottom: '1rem' }}>
          <CloudRain size={40} color="var(--accent)" />
          <h1>Weather Checker</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', textAlign: 'center' }}>
          Real-time weather updates for any city in the world
        </p>
      </header>
      <main className="glass-panel" style={{ padding: '2rem', width: '100%', maxWidth: '600px' }}>
        <SearchBar onSearch={handleSearch} />
        <div style={{ marginTop: '2rem', minHeight: '200px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {loading && (
            <div className="flex-center flex-column" style={{ padding: '3rem 0' }}>
              <div className="animate-spin" style={{ marginBottom: '1rem' }}>
                <Loader2 size={32} color="var(--accent)" />
              </div>
              <p style={{ color: 'var(--text-secondary)' }}>Gathering clouds...</p>
            </div>
          )}
          {error && !loading && (
            <div className="glass-panel animate-fade-in" style={{ padding: '1.5rem', textAlign: 'center', borderColor: 'rgba(239, 68, 68, 0.3)' }}>
              <h3 style={{ color: 'var(--danger)', marginBottom: '0.5rem' }}>Oops!</h3>
              <p style={{ color: 'var(--text-secondary)' }}>{error}</p>
            </div>
          )}
          {!loading && !error && weatherData && (
            <WeatherCard weather={weatherData} unit={unit} onToggleUnit={toggleUnit} />
          )}
          {!loading && !error && !weatherData && (
            <div className="glass-panel" style={{ padding: '2rem', textAlign: 'center', borderStyle: 'dashed' }}>
              <p style={{ color: 'var(--text-secondary)' }}>Enter a city above to see the current weather.</p>
            </div>
          )}
        </div>
        {recentCities.length > 0 && (
          <div style={{ marginTop: '2rem', borderTop: '1px solid var(--glass-border)', paddingTop: '1.5rem' }}>
            <RecentCities cities={recentCities} onSelectCity={handleCitySelect} />
          </div>
        )}
      </main>
    </div>
  );
}
export default App;
