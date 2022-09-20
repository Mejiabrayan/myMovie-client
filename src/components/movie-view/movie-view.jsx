import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './movie-view.scss';

export class MovieView extends React.Component {
  keypressCallback(event) {
    console.log(event.key);
  }
  componentDidMount() {
    document.addEventListener('keypress', this.keypressCallback);
  }

  componentWillUnmount() {
    document.removeEventListener('keypress', this.keypressCallback);
  }
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Container className='movie-view'>
        <Row className='movie-poster'>
          <Col className='movie-img'>
            <img src={movie.ImageURL} className='img-fluid' />
          </Col>
        </Row>
        <Row className='movie-genre mt-3'>
          <Col>
            <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>GENRE </p>
            <ul className='list-inline'>
              <li className='list-inline-item'>
                <Button type='button' className='btn btn-outline-info'>
                  {movie.Genre.Name}
                </Button>
              </li>
            </ul>
              <Link to={`/genres/${movie.Genre.Name}`}>
              <Button variant='link'>More info</Button>
            </Link>
          </Col>
        </Row>
        <Row className='movie-title'>
          <Col>
            <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>TITLE</p>
            <p>{movie.Title}</p>
          </Col>
        </Row>
        <Row className='movie-description'>
          <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>OVERVIEW</p>
          <p className='value'> {movie.Description}</p>
        </Row>
        <Row className='movie-director'>
          <Col>
            <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>DIRECTOR</p>
            <p>{movie.Director.Name}</p>
            <Link to={`/directors/${movie.Director.Name}`}>
              <Button variant='link'>More info</Button>
            </Link>
          </Col>
        </Row>

        {/* Temporary; Testing  */}
        <Row className='director-profile'>
          <Col className='col-md-3 text-center'>
            <img
              src={movie.Director.profile}
              className='profile img-fluid rounded-circle mx-auto d-block'
            ></img>
          </Col>
        </Row>
        <Row className='director-bio'>
          <Col>
            <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>BIO</p>
            <p> {movie.Director.Bio}</p>
          </Col>
        </Row>
        <Row className='actors'>
          <Col>
            <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>ACTORS</p>
            <p className='value'> {movie.Actors}</p>
          </Col>
        </Row>

        {/* <Row className='genre-description'>
          <Col>
            <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>
              DESCRIPTION{' '}
            </p>
            <p className='value'>{movie.Genre.Description}</p>
          </Col>
        </Row> */}

        <Button
          variant='primary'
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
      </Container>
    );
  }
}
