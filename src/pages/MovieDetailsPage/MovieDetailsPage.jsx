import React, { Suspense, useEffect, useRef, useState } from 'react';
import {
  useParams,
  Link,
  NavLink,
  Outlet,
  useLocation,
} from 'react-router-dom';
import { fetchMovieDetails } from '../../api';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from || '/movies');

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const movieData = await fetchMovieDetails(movieId);
        setMovie(movieData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching movie:', error);
        setLoading(false);
      }
    };

    fetchMovie();
  }, [movieId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movie) {
    return <div>Movie not found</div>;
  }

  return (
    <div className={css.container}>
      <p>
        <b>
          <Link to={backLinkRef.current}>Go back</Link>
        </b>
      </p>
      <img
        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
        alt={movie.title}
      />
      <div>
        <h2>{movie.title}</h2>
        <p>{movie.overview}</p>
      </div>
      <ul>
        <li>
          <NavLink to="cast">Cast</NavLink>
        </li>
        <li>
          <NavLink to="reviews">Reviews</NavLink>
        </li>
      </ul>
      <Suspense fallback={<div>Loading sub-component...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetailsPage;
