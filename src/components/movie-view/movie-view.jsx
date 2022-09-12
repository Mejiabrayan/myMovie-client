import { Collapse } from 'bootstrap';
import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
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
    const { movieData, onBackClick } = this.props;
    return (
      <Container className='movie-view'>
        <Row className='movie-poster'>
          <Col class='movie-img'>
            <img src={movieData.ImageURL} className='img-fluid' />
          </Col>
        </Row>
        <Row className='movie-genre mt-3'>
          <Col>
            <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>GENRE </p>
            <ul className='list-inline'>
              <li className='list-inline-item'>
                <Button type='button' className='btn btn-outline-info'>
                  {movieData.Genre.Name}
                </Button>
              </li>
            </ul>
          </Col>
        </Row>
        <Row className='movie-title'>
          <Col>
            <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>TITLE</p>
            <p>{movieData.Title}</p>
          </Col>
        </Row>
        <Row className='movie-description'>
          <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>OVERVIEW</p>
          <p className='value'> {movieData.Description}</p>
        </Row>
        <Row className='movie-director'>
          <Col>
            <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>DIRECTOR</p>
            <p>{movieData.Director.Name}</p>
          </Col>
        </Row>

        {/* Temporary; Testing  */}
        <Row className='director-profile'>
          <Col className='col-md-3 text-center'>
            <img
              src={movieData.Director.profile}
              className='profile img-fluid rounded-circle mx-auto d-block'
            ></img>
          </Col>
        </Row>
        <Row className='director-bio'>
          <Col>
            <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>BIO</p>
            <p> {movieData.Director.Bio}</p>
          </Col>
        </Row>
        <Row className='actors'>
          <Col>
            <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>ACTORS</p>
            <p className='value'> {movieData.Actors}</p>
          </Col>
        </Row>

        <Row className='genre-description'>
          <Col>
            <p style={{ color: '#5a606b', fontWeight: 'bolder' }}>
              DESCRIPTION{' '}
            </p>
            <p className='value'>{movieData.Genre.Description}</p>
          </Col>
        </Row>

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
