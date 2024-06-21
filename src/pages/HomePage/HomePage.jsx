import { useState, useEffect } from 'react';
import { fetchTrendingMovies } from '../../api';
import MovieList from '../../components/MovieList/MovieList';
import css from './HomePage.module.css';

export default function HomePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchTrendingMovies().then(setMovies);
  }, []);

  return (
    <div className={css.container}>
      <h1>Trending Movies</h1>
      <MovieList movies={movies} />
    </div>
  );
}
