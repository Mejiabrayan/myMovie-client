import React from 'react';
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
    let accessToken = localStorage.getItem('Token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage('user'),
      });
      this.getMovies(accessToken);
    }
  }

  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  // When a user successfully logs in, this function updates the user property in state to that particular user (which is passed in as an argument to this function) and sets the selectedMovie property to null.
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username, // new state property to keep track of the user (null by default)
    });
    localStorage.setItem('token', authData.token); // stores the JWT token in the browser's local storage
    localStorage.setItem('user', authData.user.Username); // stores the user's username in the browser's local storage
    this.getMovies(authData.token); // calls the getMovies function, passing in the JWT token as an argument
  }
  getMovies(token) {
    axios
      .get('https://mymoviesapi2023.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` }, // passes the bearer auth in the header of http request // you can make authenticated request
      })
      .then((response) => {
        // Assigns the resul to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  render() {
    // If the state isn't initialized, this will throw on runtime before the data is initially loaded (e.g. if the user refreshes the page)
    const { movies, selectedMovie, user } = this.state;

    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    if (movies.length === 0) return <div className='main-view' />;
    return (
      <Row className='main-view justify-content-md-center'>
        {selectedMovie ? (
          <Col md={8} mb={3}>
            <MovieView
              movieData={selectedMovie}
              onBackClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ) : (
          movies.map((movie) => (
            <Col md={3} key={movie._id}>
              <MovieCard
                // key is a special and reserved property in React (along with ref, a more advanced feature). When an element is created, React extracts the key property and stores the key directly on the returned element. Even though key may look like it belongs in props, key cannot be referenced using this.props.key. React automatically uses key to decide which components to update. A component cannot inquire about its key.
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
