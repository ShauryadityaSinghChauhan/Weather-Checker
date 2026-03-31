import { Cloud, CloudDrizzle, CloudFog, CloudLightning, CloudRain, CloudSnow, Sun, Wind, Droplets, Thermometer } from 'lucide-react';

export default function WeatherCard({ weather, unit, onToggleUnit }) {
  const getWeatherIcon = (conditionCode) => {
    if (conditionCode >= 200 && conditionCode < 300) return <CloudLightning size={72} color="#facc15" style={{ filter: 'drop-shadow(0 0 10px rgba(250,204,21,0.5))' }} />;
    if (conditionCode >= 300 && conditionCode < 400) return <CloudDrizzle size={72} color="#60a5fa" style={{ filter: 'drop-shadow(0 0 10px rgba(96,165,250,0.5))' }} />;
    if (conditionCode >= 500 && conditionCode < 600) return <CloudRain size={72} color="#38bdf8" style={{ filter: 'drop-shadow(0 0 10px rgba(56,189,248,0.5))' }} />;
    if (conditionCode >= 600 && conditionCode < 700) return <CloudSnow size={72} color="#e2e8f0" style={{ filter: 'drop-shadow(0 0 10px rgba(226,232,240,0.5))' }} />;
    if (conditionCode >= 700 && conditionCode < 800) return <CloudFog size={72} color="#94a3b8" style={{ filter: 'drop-shadow(0 0 10px rgba(148,163,184,0.4))' }} />;
    if (conditionCode === 800) return <Sun size={72} color="#fcd34d" style={{ filter: 'drop-shadow(0 0 12px rgba(252,211,77,0.6))' }} />;
    if (conditionCode > 800) return <Cloud size={72} color="#a5b4fc" style={{ filter: 'drop-shadow(0 0 10px rgba(165,180,252,0.4))' }} />;
    return <Cloud size={72} color="#a5b4fc" />;
  };

  const weatherCondition = weather.weather[0];
  const icon = getWeatherIcon(weatherCondition.id);
  const dateObj = new Date();
  const dateStr = dateObj.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  const timeStr = dateObj.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  const desc = weatherCondition.description.charAt(0).toUpperCase() + weatherCondition.description.slice(1);

  return (
    <div className="animate-fade-in" style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      {/* City + toggle */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.2rem' }}>
            {weather.name}, {weather.sys.country}
          </h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', fontFamily: 'var(--font-mono)', letterSpacing: '0.04em' }}>
            {dateStr} · {timeStr}
          </p>
        </div>
        <button
          onClick={onToggleUnit}
          style={{
            padding: '0.4rem 0.85rem',
            cursor: 'pointer',
            border: '1px solid var(--glass-border)',
            background: 'rgba(124, 92, 252, 0.12)',
            color: 'var(--accent-hover)',
            borderRadius: '8px',
            fontWeight: '700',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.9rem',
            transition: 'var(--transition)',
            flexShrink: 0,
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.background = 'rgba(124, 92, 252, 0.25)';
            e.currentTarget.style.boxShadow = '0 0 12px rgba(124, 92, 252, 0.3)';
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.background = 'rgba(124, 92, 252, 0.12)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          °{unit === 'metric' ? 'C' : 'F'}
        </button>
      </div>

      {/* Temperature row */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        padding: '1.5rem',
        background: 'rgba(124, 92, 252, 0.07)',
        border: '1px solid rgba(124, 92, 252, 0.15)',
        borderRadius: '12px',
      }}>
        <div className="animate-pulse" style={{ flexShrink: 0 }}>
          {icon}
        </div>
        <div>
          <div style={{
            fontSize: '4.5rem',
            fontWeight: '700',
            lineHeight: '1',
            fontFamily: 'var(--font-mono)',
            background: 'linear-gradient(135deg, #ffffff, var(--neon-green))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}>
            {Math.round(weather.main.temp)}°
          </div>
          <div style={{ fontSize: '1rem', color: 'var(--text-secondary)', marginTop: '0.4rem', letterSpacing: '0.02em' }}>
            {desc}
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
        {[
          { Icon: Wind, label: 'Wind', value: `${weather.wind.speed} ${unit === 'metric' ? 'm/s' : 'mph'}`, color: 'var(--neon-blue)' },
          { Icon: Droplets, label: 'Humidity', value: `${weather.main.humidity}%`, color: 'var(--accent-hover)' },
          { Icon: Thermometer, label: 'Feels Like', value: `${Math.round(weather.main.feels_like)}°`, color: 'var(--neon-green)' },
        ].map(({ Icon, label, value, color }) => (
          <div key={label} style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            padding: '1rem 0.5rem',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 255, 255, 0.06)',
            borderRadius: '10px',
          }}>
            <Icon size={18} color={color} style={{ filter: `drop-shadow(0 0 6px ${color})` }} />
            <span style={{ fontWeight: '700', fontSize: '1rem', fontFamily: 'var(--font-mono)' }}>{value}</span>
            <span style={{ fontSize: '0.72rem', color: 'var(--text-secondary)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
