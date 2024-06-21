import { useState } from 'react';

export default function SearchBar({ onSubmit }) {
  const [query, setQuery] = useState('');

  const handleSearch = async e => {
    e.preventDefault();
    onSubmit(query);
  };

  return (
    <form onSubmit={handleSearch}>
      <input
        type="text"
        value={query}
        onChange={e => setQuery(e.target.value)}
        placeholder="Search for movies"
      />
      <button type="submit">Search</button>
    </form>
  );
}
