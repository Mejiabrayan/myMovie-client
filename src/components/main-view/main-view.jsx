import React from 'react';
import axios from 'axios';
import { Row, Col, Container } from 'react-bootstrap';
import Spinner from 'react-bootstrap/Spinner';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { LoginView } from '../login-view/login-view';
import { MovieView } from '../movie-view/movie-view';
import { ProfileView } from '../profile-view/profile-view';
import { RegistrationView } from '../registration-view/registration-view';
import { DirectorView } from '../director-view/director-view';
import { GenreView } from '../genre-view/genre-view';
import { MenuBar } from '../navbar/navbar';

import { connect } from 'react-redux';
import { setMovies, setUser } from '../../actions/actions';

import MoviesList from '../movies-list/movies-list';

export class MainView extends React.Component {
  constructor() {
    super();
  }
  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if (accessToken !== null) {
      this.props.setUser({
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
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(`${error} There is an error`);
      });
  }

  // When a user successfully logs in, this function updates the user property in state to that particular user (which is passed in as an argument to this function) and sets the selectedMovie property to null.

  onLoggedIn(authData) {
    console.log(`Succesfully logged in ${authData.user.Username}!`);
    this.props.setUser({
      user: authData.user.Username,
    });
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    localStorage.setItem('email', authData.user.Email);
    localStorage.setItem('birthday', authData.user.Birthday);
    localStorage.setItem('favoriteMovies', authData.user.FavoriteMovies);
    localStorage.setItem('movies', authData.user.Movies);
    localStorage.setItem('password', authData.user.Password);
    this.getMovies(authData.token);
  }

  render() {
    // movies is exracted from the state so it can be used below in the return statement
    let { movies, user } = this.props;

    // Before the movies have been loaded (this.props.movies is empty), this will throw on runtime before the data is initially loaded

    if (!movies)
      return function growSpinner() {
        return <Spinner animation='grow' />;
      };

    return (
      <Router>
        <MenuBar user={user} />
        <Container fluid>
          <Row className='main-view justify-content-md-center'>
            {/* Routes to movies */}
            <Route
              exact
              path='/'
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );

                if (movies.length === 0) return <div className='main-view' />;

                return <MoviesList movies={movies} />;
              }}
            />
            <Route
              path='/register'
              render={() => {
                console.log('Succesful route');
                if (user) return <Redirect to='/' />;
                return (
                  <Col>
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
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                      ;
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
              path={`/users/:username`}
              render={({ history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className='main-view' />;
                return (
                  <Col>
                    <ProfileView
                      movies={movies}
                      user={user}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path={`/users//user-update/${user}`}
              render={({ history }) => {
                if (!user) return <Redirect to='/' />;
                return (
                  <Col>
                    <UpdateUser
                      user={user}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Container>
      </Router>
    );
  }
}

let mapStateToProps = (state) => {
  return { movies: state.movies, user: state.user };
};

export default connect(mapStateToProps, { setMovies, setUser })(MainView);
