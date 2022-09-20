import React from 'react';
import propTypes from 'prop-types';
import { Container, Col, Container, Row, Button } from 'react-bootstrap';

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;

    return (
      <Container>
        <Row>
          <Col>Genre:</Col>
          <Col>{genre.Genre.Name}</Col>
        </Row>
        <Row>
          <Col>Description:</Col>
          <Col>{genre.Genre.Description}</Col>
        </Row>
        <Button
          onClick={() => {
            onBackClick(null);
          }}
          variant='warning'
        >
          Back
        </Button>
      </Container>
    );
  }
}

GenreView.propTypes = {
  genre: propTypes.shape({
    Name: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
  }).isRequired
};
