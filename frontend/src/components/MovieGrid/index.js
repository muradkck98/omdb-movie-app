import React from 'react';
import { useSelector } from 'react-redux';
import './index.css';

const MovieGrid = () => {
  const { movies, loading, error } = useSelector((state) => state);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="movie-container">
      <div className="grid">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.imdbID}>
            <img
              src={movie.Poster !== 'N/A' ? movie.Poster : 'placeholder.jpg'}
              alt={movie.Title}
              className="movie-poster"
            />
            <p className="movie-title">{movie.Title}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MovieGrid;
