import React from 'react';
import { Link } from 'react-router-dom';

export function FavoriteMovies(favoriteMoviesList) {
  return (
  //  Build a list of favorite movies here
    <div className="favorite-movies">
      <h2>Favorite Movies</h2>
      <div className="movies">
        {favoriteMoviesList.map((movie) => (
          <div className="movie" key={movie._id}>
            <Link to={`/movies/${movie._id}`}>
              <img className="movie-poster" src={movie.ImageURL} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
