import React from 'react';
import propTypes from 'prop-types';
import { Container, Col, Container, Row, Button } from 'react-bootstrap';
import './genre-view.scss';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container fluid  style={{ minHeight: '100vh' }} >
        <Row sm={2} id='genre-content' className=''>
          <Col sm={8} md={12}>
            <h1 className='genre-heading'>Genre:</h1>
          </Col>
          <Col>
            <h2 className='genre-sub-heading text-warning'>{genre.Genre.Name}</h2>
            <h3 className='genre-description'>Description: <br/>{''}
              <span >{genre.Genre.Description}</span>
            </h3>
          </Col>
        </Row>
        <Row>
          <Col>
            <Button className='back-button' variant='outline-warning' onClick={() => { onBackClick(null); }}>Back</Button>
          </Col>
        </Row>
      </Container>
    );
  }
}

GenreView.propTypes = {
  genre: propTypes.shape({
    Name: propTypes.string,
    Description: propTypes.string.isRequired,
  }).isRequired,
};
