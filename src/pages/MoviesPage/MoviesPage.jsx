import { useState } from 'react';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import { searchMovies } from '../../api';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async query => {
    setLoading(true);
    try {
      const results = await searchMovies(query);
      setMovies(results);
      if (results.length === 0) {
        setError('No movies found. Please try another search.');
      } else {
        setError('');
      }
    } catch (error) {
      console.error('Error searching movies:', error);
      setError('Error searching movies. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={css.container}>
      <h1>Search Movies</h1>
      <SearchBar onSubmit={handleSearch} />
      {loading && <p>Loading...</p>}
      {error && <p className={css.error}>{error}</p>}
      {!loading && !error && <MovieList movies={movies} />}
    </div>
  );
}
