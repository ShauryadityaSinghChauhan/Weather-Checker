export default function RecentCities({ cities, onSelectCity }) {
  if (!cities || cities.length === 0) return null;

  return (
    <div className="animate-fade-in">
      <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
        Recently Searched
      </h3>
      <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
        {cities.map((city, index) => (
          <button
            key={`${city}-${index}`}
            onClick={() => onSelectCity(city)}
            className="glass-panel" 
            style={{ 
              padding: '0.5rem 1rem', 
              borderRadius: '999px', 
              fontSize: '0.9rem', 
              cursor: 'pointer',
              border: '1px solid var(--glass-border)',
              background: 'rgba(255, 255, 255, 0.05)',
              color: 'var(--text-primary)',
              transition: 'var(--transition)'
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}
