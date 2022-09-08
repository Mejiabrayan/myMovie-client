import React from 'react';


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
      <div className='movie-view img-rounded'>
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
        <div className='movie-director'>
          <span className='label'>Director: </span>
          <span>{movieData.Director.Name}</span>
        </div>
        <div className='director-bio'>
          <span className='label'> Bio: </span>s
          <span className='value'> {movieData.Director.Bio}</span>
        </div>
        <div className='actors'>
          <span className='label'>Actors: </span>
          <span className='value'> {movieData.Actors}</span>
        </div>
        <div className='movie-genre'>
          <span className='label'>Genre: </span>
          <span className='value'>{movieData.Genre.Name}</span>
        </div>
        <div className='genre-description'>
          <span className='label'>Description:</span>
          <span className='value'>{movieData.Genre.Description}</span>
        </div>
{/* 
        <div className='featured'>
          <span className='label'>Featured: </span>
          <span className='value'>{movieData.Featured}</span>
        </div> */}

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
