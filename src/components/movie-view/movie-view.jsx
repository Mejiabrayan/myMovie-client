import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Button, Container, Row, Col } from 'react-bootstrap';

import './movie-view.scss';
import MovieInfo from './movie-info';

export class MovieView extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      user: null,
    };
  }

  addMovie(movie, user) {
    let username = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    console.log(movie);
    console.log(token);

    axios
      .post(
        `https://mymoviesapi2023.herokuapp.com/users/${username}/movies/${movie._id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response.data);
        alert(`${movie.Title} has been added from your list.`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  removeFavMovie = (movie, user) => {
    let token = localStorage.getItem('token');
    let username = localStorage.getItem('user');
    console.log(movie);
    console.log(token);
    axios
      .delete(
        `https://mymoviesapi2023.herokuapp.com/users/${username}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert(`${movie.Title} has been removed from your list.`);
      })
      .catch((e) => {
        console.log('Error');
      });
  };

  render() {
    const { movie, user, onBackClick } = this.props;

    return (
      <Container>
        <MovieInfo movie={movie} user={user} />
        <Row className='movie-view-buttons'>
          <Col>
            <Button
              className='button '
              variant='primary'
              onClick={() => {
                onBackClick(null);
              }}
            >
              Back
            </Button>
            <Button
              className='button ml-2'
              onClick={() => {
                this.addMovie(movie, user);
              }}
            >
              Add to favorites
            </Button>
            <Button
              className='button ml-2'
              onClick={() => {
                this.removeFavMovie(movie, user);
              }}
            >
              Remove from favorites
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
