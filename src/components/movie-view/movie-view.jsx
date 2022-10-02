import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { IoIosAddCircleOutline } from 'react-icons/io';
import { IoIosRemoveCircleOutline } from 'react-icons/io';

import { Button, Row, Col, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

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
      <Container className='d-flex ' style={{ minHeight: '100vh' }}>
        <Row className='align-items-start '>
          <Col sm={12} md={6} lg={8}>
            <img src={movie.ImageURL} className='img-fluid rounded'/>
          </Col>
        </Row>
        <Row>
          <Col sm={12} md={6} lg={8} className='movie-info'>
            <h1 className='movie-title'>{movie.Title}</h1>
            {/* Testing UI */}
            <div className='rating'>
              <p className='text-secondary'>Rating</p>⭐️⭐️⭐️⭐️{' '}
            </div>
            <div className='actors'>
              <p className='text-secondary'>Actors</p>
              <p>{movie.Actors}</p>
            </div>
            <p>{movie.Description}</p>
            <p className='text-secondary'>Director</p>
            <Link to={`/directors/${movie.Director.Name}`}>
              {movie.Director.Name}
            </Link>
            <div className='genre'>
            <p className='text-secondary'>Genre</p>
            <Link to={`/genres/${movie.Genre.Name}`}>{movie.Genre.Name}</Link>
            </div>
          </Col>
      
          <div>
            <Button
              className='add-btn text-center'
              onClick={() => {
                this.addMovie(movie, user);
              }}
            >
              <IoIosAddCircleOutline />
            </Button>
            <Button
              className='button'
              variant='danger'
              onClick={() => {
                this.removeFavMovie(movie, user);
              }}
            >
              <IoIosRemoveCircleOutline />
            </Button>
          </div>
          {/* <div>
            <Button
              className='button'
              variant='danger'
              onClick={() => {
                this.removeFavMovie(movie, user);
              }}
            >
              <IoIosRemoveCircleOutline />
            </Button>
          </div> */}
          <div className='mt-3'>
            <Link to={`/`}>
              <Button
                className='button'
                variant='warning'
                onClick={() => onBackClick()}
              >
                Back
              </Button>
            </Link>
          </div>
        </Row>
      </Container>
    );
  }
}
