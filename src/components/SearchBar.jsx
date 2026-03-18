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
    <form onSubmit={handleSubmit} style={{ position: 'relative' }}>
      <input 
        type="text" 
        className="glass-input" 
        placeholder="Search for a city..." 
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button 
        type="submit"
        className="icon-btn" 
        style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)' }}
        aria-label="Search"
      >
        <Search size={20} />
      </button>
    </form>
  );
}
