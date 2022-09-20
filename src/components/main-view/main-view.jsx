import React from 'react';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
// import { UpdateUser } from '../profile-view/update-user';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { MenuBar } from '../navbar/navbar';

export class MainView extends React.Component {
  constructor() {
    super();
    // Initial State is set to null
    this.state = {
      movies: [],
      user: null, // new state property to keep track of the user (null by default)
    };
  }
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user'),
      });
      this.getMovies(accessToken);
    }
  }

  getMovies(token) {
    axios
      .get('https://mymoviesapi2023.herokuapp.com/movies', {
        headers: { Authorization: `Bearer ${token}` }, // passes the bearer auth in the header of http request // you can make authenticated request
      })
      .then((response) => {
        // Assigns the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(`${error} There is an error`);
      });
  }

  // When a user successfully logs in, this function updates the user property in state to that particular user (which is passed in as an argument to this function) and sets the selectedMovie property to null.

  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });
    console.log(`User logged succesfully ${authData}`);

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut(authData) {
    localStorage.removeItem('token', authData.token);
    localStorage.removeItem('user', authData.user.Username);
    this.setState({
      user: null,
    });
  }

  onRegisterOut() {
    this.setState({
      isRegistered: null,
    });
  }

  render() {
    const { movies, user } = this.state;

    if (!movies)
      return (
        <div className='main-view'> This list is empty. loading info...</div>
      );

    return (
      <Router>
        <MenuBar user={user} />
        <Row className='main-view justify-content-md-center'>
          {/* Routes to movies */}

          <Route
            exact
            path='/'
            render={() => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
                  </Col>
                );
              if (movies.length === 0) return <div className='main-view' />;

              return movies.map((m) => (
                <Col md={3} key={m._id}>
                  <MovieCard movie={m} />
                </Col>
              ));
            }}
          />

          <Route
            path='/register'
            render={() => {
              console.log('Succesful route');
              if (user) return <Redirect to='/' />;
              return (
                <Col lg={8} md={8}>
                  <RegistrationView />
                </Col>
              );
            }}
          />

          {/* Movie Route */}

          <Route
            path='/movies/:movieId'
            render={({ match, history }) => {
              console.log('Router successful');
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;
                  </Col>
                );
              if (movies.length === 0) return <div className='main-view' />;
              return (
                <Col md={8}>
                  <MovieView
                    movie={movies.find((m) => m._id === match.params.movieId)}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          {/* Director Route */}

          <Route
            path='/directors/:name'
            render={({ match, history }) => {
              console.log('error');
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className='main-view' />;
              return (
                <Col md={8}>
                  <DirectorView
                    director={movies.find(
                      (m) => m.Director.Name === match.params.name
                    )}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path='/genres/:name'
            render={({ match, history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className='main-view' />;
              return (
                <Col md={8}>
                  <GenreView
                    genre={movies.find(
                      (m) => m.Genre.Name === match.params.name
                    )}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />

          <Route
            path={`/users/${user}`}
            render={({ history }) => {
              if (!user)
                return (
                  <Col>
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  </Col>
                );
              if (movies.length === 0) return <div className='main-view' />;
              return (
                <Col md={8}>
                  <ProfileView
                    movies={movies}
                    user={user}
                    onBackClick={() => history.goBack()}
                  />
                </Col>
              );
            }}
          />
        </Row>
      </Router>
    );
  }
}
