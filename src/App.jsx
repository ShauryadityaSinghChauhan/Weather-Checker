import { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import RecentCities from './components/RecentCities';
import { Satellite, Loader2 } from 'lucide-react';
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
    if (searchedCity.trim() !== '') setCity(searchedCity);
  };

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
  };

  const toggleUnit = () => {
    setUnit(prev => prev === 'metric' ? 'imperial' : 'metric');
  };

  return (
    <div className="app-container animate-fade-in">
      {/* Header */}
      <header style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.9rem' }}>
          <div className="neon-tag">
            <Satellite size={11} />
            Live Data
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '0.6rem' }}>
          <h1>Weather Checker</h1>
        </div>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Real-time weather updates for any city in the world
        </p>
      </header>

      {/* Main Panel */}
      <main className="glass-panel" style={{ padding: '1.75rem', width: '100%' }}>
        <SearchBar onSearch={handleSearch} />

        <div style={{ marginTop: '1.75rem', minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          {loading && (
            <div className="flex-center flex-column" style={{ padding: '2.5rem 0' }}>
              <div className="animate-spin" style={{ marginBottom: '0.9rem' }}>
                <Loader2 size={30} color="var(--accent)" />
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                Scanning the atmosphere...
              </p>
            </div>
          )}

          {error && !loading && (
            <div className="animate-fade-in" style={{
              padding: '1.25rem 1.5rem',
              textAlign: 'center',
              background: 'rgba(255, 77, 109, 0.08)',
              border: '1px solid rgba(255, 77, 109, 0.25)',
              borderRadius: '12px',
            }}>
              <h3 style={{ color: 'var(--danger)', marginBottom: '0.4rem', fontSize: '1rem' }}>
                ⚠ Location not found
              </h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>{error}</p>
            </div>
          )}

          {!loading && !error && weatherData && (
            <WeatherCard weather={weatherData} unit={unit} onToggleUnit={toggleUnit} />
          )}

          {!loading && !error && !weatherData && (
            <div style={{
              padding: '2rem',
              textAlign: 'center',
              border: '1px dashed rgba(124, 92, 252, 0.25)',
              borderRadius: '12px',
              background: 'rgba(124, 92, 252, 0.04)',
            }}>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                Enter a city name above to get live weather data.
              </p>
            </div>
          )}
        </div>

        {recentCities.length > 0 && (
          <>
            <hr className="neon-divider" style={{ marginTop: '1.75rem' }} />
            <div style={{ marginTop: '1.5rem' }}>
              <RecentCities cities={recentCities} onSelectCity={handleCitySelect} />
            </div>
          </>
        )}
      </main>

      <footer style={{ marginTop: '1.5rem', textAlign: 'center' }}>
        <p style={{ color: 'rgba(180,175,255,0.3)', fontSize: '0.75rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.05em' }}>
          POWERED BY OPENWEATHERMAP API
        </p>
      </footer>
    </div>
  );
}
export default App;
