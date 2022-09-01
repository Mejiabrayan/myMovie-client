import React from 'react';

export class MovieView extends React.Component {
  render() {
    const { movieData, onBackClick } = this.props;
    return (
      <div className='movie-view'>
        <div className='movie-poster'>
          <img src={movieData.ImageURL} />
        </div>
        <div className='movie-title'>
          <span className='label'>Title: </span>
          <span>{movieData.Title}</span>
        </div>
        <div className='movie-description'>
          <span className='label'> Description: </span>
          <span className='value'> {movieData.Description}</span>
        </div>
        <div className='movie-genre'>
          <span className='label'>Genre: </span>
          <span className='value'>{movieData.Genre}</span>
        </div>

        <button
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </button>
      </div>
    );
  }
}
