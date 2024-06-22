import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../../components/SearchBar/SearchBar';
import MovieList from '../../components/MovieList/MovieList';
import { searchMovies } from '../../api';
import css from './MoviesPage.module.css';

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true);
      try {
        const results = await searchMovies(query);
        setMovies(results);
      } catch (error) {
        console.error('Error searching movies:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [query]);

  const handleSearch = newQuery => {
    setSearchParams(newQuery ? { query: newQuery } : {});
  };

  return (
    <div className={css.container}>
      <h1>Search Movies</h1>
      <SearchBar onSubmit={handleSearch} initialValue={query} />
      {loading ? <p>Loading...</p> : <MovieList movies={movies} />}
    </div>
  );
}
