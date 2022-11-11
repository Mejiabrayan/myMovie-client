// import React from 'react';
// import { Container, Row, Col, Button, Card } from 'react-bootstrap';
// import { Link } from 'react-router-dom';
// import './movie-view.scss';

// function MovieInfo({ movie }) {
//   return (
//     <Container className='movie-info'>
//       <Row className='justify-content-center d-flex align-items-center '>
//         <Col sm={12} md={6} lg={8}>
//           <img src={movie.ImageURL} className='img-fluid rounded' />
//         </Col>
//       </Row>
//       <Row>
//         <Col sm={12} md={5} lg={8} className='movie-info'>
//           <h1>{movie.Title}</h1>
//           {/* Testing UI */}
//           <div className='rating'>
//             <p className='text-secondary'>Rating</p>⭐️⭐️⭐️⭐️{' '}
//           </div>
//           <div className='actors mt-2'>
//             <p className='text-secondary'>Actors</p>
//             <p>{movie.Actors}</p>
//           </div>
//           <p>{movie.Description}</p>
//           <p className='text-secondary'>Director</p>
//           <p>{movie.Director.Name}</p>
//           <p className='text-secondary'>Genre</p>
//           <p>{movie.Genre.Name}</p>
//           <Link to={`/`}>
//             <Button  variant='outline-warning'>Back</Button>
//           </Link>
//         </Col>
//       </Row>
   
//     </Container>
//   );
// }

// export default MovieInfo;
