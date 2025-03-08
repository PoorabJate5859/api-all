import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies } from '../features/MovieSlice';

const Movie = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { data, status, error } = useSelector((state) => state.movie);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) dispatch(fetchMovies(query));
  };

  return (
    <div className="movie-container">
      <div className="movie-header">
        <form onSubmit={handleSearch} className="search-bar">
          <input
            type="text"
            placeholder="Search movies..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit">
            🔍
          </button>
        </form>
      </div>

      {data?.Search && (
        <div className="movie-grid">
          {data.Search.map((movie) => (
            <div key={movie.imdbID} className="movie-card">
              <img
                src={movie.Poster}
                alt={movie.Title}
                className="movie-poster"
              />
              <div className="movie-info">
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {status === 'loading' && <div className="loading-spinner"></div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Movie;