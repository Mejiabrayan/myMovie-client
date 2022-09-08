import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
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
      user,
    });
  }

  render() {
    // If the state isn't initialized, this will throw on runtime before the data is initially loaded (e.g. if the user refreshes the page)
    const { movies, selectedMovie, user } = this.state;

    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />; // If the user isn't logged in, the LoginView is rendered. This is done by checking whether the user state is null or not.

    if (movies.length === 0) return <div className='main-view' />;
    return (
      <Row className='main-view justify-content-md-center'>
        {selectedMovie ? (
          <Col md={8}>
            <MovieView
              movieData={selectedMovie}
              onBackClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ) : (
          movies.map((movie) => (
            <Col md={3}>
              <MovieCard
                key={movie._id} // key is a special and reserved property in React (along with ref, a more advanced feature). When an element is created, React extracts the key property and stores the key directly on the returned element. Even though key may look like it belongs in props, key cannot be referenced using this.props.key. React automatically uses key to decide which components to update. A component cannot inquire about its key.
                movieData={movie}
                onMovieClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))
        )}
        
      </Row>
    );
  }
}
