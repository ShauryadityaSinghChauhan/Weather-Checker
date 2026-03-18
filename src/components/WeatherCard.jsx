import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, Wind, Droplets, Thermometer } from 'lucide-react';

export default function WeatherCard({ weather, unit, onToggleUnit }) {
  const getWeatherIcon = (conditionCode) => {
    if (conditionCode >= 200 && conditionCode < 300) return <CloudLightning size={80} color="#eab308" />;
    if (conditionCode >= 300 && conditionCode < 400) return <CloudDrizzle size={80} color="#60a5fa" />;
    if (conditionCode >= 500 && conditionCode < 600) return <CloudRain size={80} color="#3b82f6" />;
    if (conditionCode >= 600 && conditionCode < 700) return <CloudSnow size={80} color="#e2e8f0" />;
    if (conditionCode >= 700 && conditionCode < 800) return <CloudFog size={80} color="#94a3b8" />;
    if (conditionCode === 800) return <Sun size={80} color="#facc15" />;
    if (conditionCode > 800) return <Cloud size={80} color="#cbd5e1" />;
    return <Cloud size={80} color="#cbd5e1" />;
  };

  const weatherCondition = weather.weather[0];
  const icon = getWeatherIcon(weatherCondition.id);
  const dateObj = new Date();
  const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  const dateStr = dateObj.toLocaleDateString('en-US', dateOptions);
  const desc = weatherCondition.description.charAt(0).toUpperCase() + weatherCondition.description.slice(1);

  return (
    <div className="glass-panel animate-fade-in" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative' }}>
      <button 
        className="glass-panel" 
        onClick={onToggleUnit}
        style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', padding: '0.4rem 0.8rem', cursor: 'pointer', border: '1px solid var(--glass-border)', background: 'rgba(255,255,255,0.05)', color: 'var(--text-primary)', borderRadius: '999px', fontWeight: '600', transition: 'var(--transition)' }}
        onMouseOver={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'; e.currentTarget.style.transform = 'scale(1.05)'; }}
        onMouseOut={(e) => { e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)'; e.currentTarget.style.transform = 'scale(1)'; }}
      >
        °{unit === 'metric' ? 'C' : 'F'}
      </button>
      <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '0.2rem', fontWeight: '600' }}>
          {weather.name}, {weather.sys.country}
        </h2>
        <p style={{ color: 'var(--text-secondary)' }}>{dateStr}</p>
      </div>
      <div className="flex-center" style={{ gap: '2rem', margin: '2rem 0' }}>
        <div style={{ animation: 'pulse 3s infinite ease-in-out' }}>
          {icon}
        </div>
        <div style={{ textAlign: 'left' }}>
          <div style={{ fontSize: '5rem', fontWeight: '700', lineHeight: '1' }}>
            {Math.round(weather.main.temp)}°
          </div>
          <div style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginTop: '0.5rem', fontWeight: '500' }}>
            {desc}
          </div>
        </div>
      </div>
      <div className="flex-between" style={{ width: '100%', padding: '1.5rem', background: 'rgba(0,0,0,0.25)', borderRadius: '16px', marginTop: '1rem', border: '1px solid rgba(255,255,255,0.05)' }}>
        <div className="flex-column flex-center">
          <Wind size={20} color="var(--accent)" style={{ marginBottom: '0.5rem' }} />
          <span style={{ fontWeight: '600' }}>{weather.wind.speed} {unit === 'metric' ? 'm/s' : 'mph'}</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Wind</span>
        </div>
        <div className="flex-column flex-center">
          <Droplets size={20} color="var(--accent)" style={{ marginBottom: '0.5rem' }} />
          <span style={{ fontWeight: '600' }}>{weather.main.humidity}%</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Humidity</span>
        </div>
        <div className="flex-column flex-center">
          <Thermometer size={20} color="var(--accent)" style={{ marginBottom: '0.5rem' }} />
          <span style={{ fontWeight: '600' }}>{Math.round(weather.main.feels_like)}°</span>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Feels Like</span>
        </div>
      </div>
    </div>
  );
}
