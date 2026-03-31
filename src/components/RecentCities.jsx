import { MapPin } from 'lucide-react';

export default function RecentCities({ cities, onSelectCity }) {
  if (!cities || cities.length === 0) return null;

  return (
    <div className="animate-fade-in">
      <p style={{
        fontSize: '0.72rem',
        fontFamily: 'var(--font-mono)',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'rgba(180,175,255,0.45)',
        marginBottom: '0.85rem',
      }}>
        Recent Searches
      </p>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        {cities.map((city, index) => (
          <button
            key={`${city}-${index}`}
            onClick={() => onSelectCity(city)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.3rem',
              padding: '0.4rem 0.9rem',
              borderRadius: '6px',
              fontSize: '0.85rem',
              fontFamily: 'var(--font-main)',
              cursor: 'pointer',
              border: '1px solid rgba(124, 92, 252, 0.2)',
              background: 'rgba(124, 92, 252, 0.07)',
              color: 'var(--text-secondary)',
              transition: 'var(--transition)',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(124, 92, 252, 0.18)';
              e.currentTarget.style.color = 'var(--text-primary)';
              e.currentTarget.style.borderColor = 'rgba(124, 92, 252, 0.45)';
              e.currentTarget.style.transform = 'translateY(-1px)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(124, 92, 252, 0.07)';
              e.currentTarget.style.color = 'var(--text-secondary)';
              e.currentTarget.style.borderColor = 'rgba(124, 92, 252, 0.2)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <MapPin size={11} />
            {city}
          </button>
        ))}
      </div>
    </div>
  );
}
