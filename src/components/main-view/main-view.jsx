import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          _id: 1,
          Title: 'Inception',
          Description: 'desc1...',
          Genre: 'Action',
          Director: 'cool director',
          Actors: 'Dylon, Mike, John',
          ImageURL:
            'https://2.bp.blogspot.com/_ej-z27dLP7M/TSCSe45IHVI/AAAAAAAAACs/MxM5ol_aVrY/s1600/inception2d6587339.jpg',
        },
        {
          _id: 2,
          Title: 'The Shawshank Redemption',
          Description: 'desc2...',
          Genre: 'Action',
          Director: 'cool director',
          Actors: 'Dylon, Mike, John',
          ImageURL:
            'https://files.kstatecollegian.com/2015/06/c4728ae2-cf07-4ae6-af7e-34cf3cb38dbe.jpg',
        },
        {
          _id: 3,
          Title: 'Gladiator',
          Description: 'desc3...',
          Genre: 'Action',
          Director: 'cool director',
          Actors: 'Dylon, Mike, John',
          ImageURL:
            'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Jn2aw3ZcXQd1ZXu00NnmBgHaLH%26pid%3DApi&f=1',
        },
      ],
    };
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    // if (selectedMovie) return <MovieView movieData={selectedMovie} />;

    if (movies.length === 0)
      return <div className='main-view'> The list is empty!</div>;

    return (
      <div className='main-view'>
        {selectedMovie ? (
          <MovieView
            movieData={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movieData={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}
