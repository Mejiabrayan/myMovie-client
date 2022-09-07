import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import axios from 'axios';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: null, // new state property to keep track of the selected movie (null by default)
      user: null, // new state property to keep track of the user (null by default)
    };
  }

  componentDidMount() {
    axios
      .get('https://mymoviesapi2023.herokuapp.com/movies')
      .then((response) => {
        this.setState({ movies: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  onLoggedIn(user) {
    this.setState({
      user
    });
  }

  render() {
    // If the state isn't initialized, this will throw on runtime before the data is initially loaded (e.g. if the user refreshes the page)
    const { movies, selectedMovie, user } = this.state;

    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />; // If the user isn't logged in, the LoginView is rendered. This is done by checking whether the user state is null or not.

    if (movies.length === 0) return <div className='main-view' />;
    return (
      <Container>
        <div className='main-view'>
          {selectedMovie ? (

            <Row>
            <MovieView
              movieData={selectedMovie}
              onBackClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
            </Row>
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
      </Container>
    );
  }
}
