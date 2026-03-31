import { useState } from 'react';
import { Search } from 'lucide-react';

export default function SearchBar({ onSearch }) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onSearch(inputValue.trim());
      setInputValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '0.6rem', alignItems: 'center' }}>
      <div style={{ position: 'relative', flex: 1 }}>
        <Search
          size={16}
          color="rgba(180,175,255,0.45)"
          style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
        />
        <input
          type="text"
          className="glass-input"
          placeholder="Search city..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          style={{ paddingLeft: '2.6rem', borderRadius: '10px' }}
        />
      </div>
      <button
        type="submit"
        className="primary-btn"
        style={{ padding: '0.85rem 1.4rem', whiteSpace: 'nowrap' }}
        aria-label="Search"
      >
        Search
      </button>
    </form>
  );
}
