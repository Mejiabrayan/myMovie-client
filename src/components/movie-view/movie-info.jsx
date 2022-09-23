import React from 'react';
import { Container, Row, Col, Button, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function MovieInfo({ movie }) {
  return (
    <Container className='movie-view mt-3'>
      <Row className='align-items-center'>
        <Col className='movie-poster d-flex justify-content-center'>
          <Image
            style={{ height: '100%', width: '100%' }}
            src={movie.ImageURL}
          />
        </Col>
      </Row>
      <Row className='movie-title text-center p-4'>
        <h4>Title: {movie.Title} </h4>
      </Row>
      <Row className='movie-description'>
        <Col className='label'>Description: </Col>
        <Col className='value'>{movie.Description}</Col>
      </Row>
      <Row className='p-4'>
        <Col>
          <Link to={`/directors/${movie.Director.Name}`}>
            <Button variant='link'>Director</Button>
          </Link>
        </Col>
        <Col>
          <Link to={`/genres/${movie.Genre.Name}`}>
            <Button variant='link'>Genre</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
}

export default MovieInfo;
