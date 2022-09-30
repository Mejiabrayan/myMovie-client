import React from 'react';
import propTypes from 'prop-types';
import { Card, Button, Container, Row, Col } from 'react-bootstrap/';

import { Link } from 'react-router-dom';

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <>
        {/* <Row className='mt-5'>
          <Col sm={12} md={6} lg={8}> */}
            <Card  className='movie-card' style={{ width: "15rem", margin: "12px" }}>
              <Card.Img variant='top' src={movie.ImageURL}  style={{ height: "20rem" }} />
              <Card.Body>
                <Card.Title className='movie-title'>{movie.Title}</Card.Title>
                <Card.Text className='movie-description'>
                  {movie.Description}
                </Card.Text>

                <Link to={`/movies/${movie._id}`}>
                  <Button variant='link'>Open</Button>
                </Link>
              </Card.Body>
            </Card>
          {/* </Col>
        </Row> */}
      </>
    );
  }
}

MovieCard.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    Director: propTypes.shape({
      Name: propTypes.string.isRequired,
      Bio: propTypes.string,
      Birth: propTypes.string.isRequired,
    }),
    Genre: propTypes.shape({
      Name: propTypes.string.isRequired,
      Description: propTypes.string,
    }),
    ImageURL: propTypes.string,
  }).isRequired,
};
