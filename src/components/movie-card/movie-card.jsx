import React from 'react';
import propTypes from 'prop-types';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

export class MovieCard extends React.Component {
  render() {
    const { movieData, onMovieClick } = this.props;
 
    return (
      <Card>
        <Card.Img
          variant='top'
          className='thumbnail'
          src={movieData.ImageURL}
        />
        <Card.Body>
          <Card.Title className="movie-title">{movieData.Title}</Card.Title>
          <Card.Text>{movieData.Description}</Card.Text>
          <Button onClick={() => onMovieClick(movieData)} variant='link'>
            Open
          </Button>
        </Card.Body>
      </Card>
    );
  }
}
MovieCard.propTypes = {
  movieData: propTypes.shape({
    Title: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    Director: propTypes.shape({
      Name: propTypes.string.isRequired,
      Bio: propTypes.string,
      Birth: propTypes.string.isRequired
    }),
    Genre: propTypes.shape({
      Name: propTypes.string.isRequired,
      Description: propTypes.string
    }),
    ImageURL: propTypes.string,
  }).isRequired,
  onMovieClick: propTypes.func.isRequired,
};
