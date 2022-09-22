import React, { useEffect, useState } from 'react';
import propTypes from 'prop-types';
import axios from 'axios';
import { Link } from 'react-router-dom';

import './profile-view.scss';

import { Container, Col, Row, Button, Card, Form } from 'react-bootstrap';

export function ProfileView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [favoriteMovies, setFavoriteMovies] = useState({});
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [user, setUserData] = useState('');
  const [movies, setMovies] = useState([]);
  const User = localStorage.getItem('user');
  const token = localStorage.getItem('token');
  const [favoriteMoviesList, setFavoriteMoviesList] = useState([]);

  const getUserData = () => {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    axios
      .get(`https://mymoviesapi2023.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUsername(response.data.Username);
        setEmail(response.data.Email);
        setUserData(response.data);
        setFavoriteMoviesList(response.data.FavoriteMovies);
        console.log(response);

        response.data.FavoriteMovies.forEach((movie_id) => {
          let favMovies = props.movies.filter(
            (movie) => movie._id === movie_id
          );
          setMovies(favMovies);
        });
      })
      .catch((error) => console.error(error));
  };

  // Delete Profile
  const handleDelete = (e) => {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    axios.delete(`https://mymoviesapi2023.herokuapp.com/users/${user}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    alert(`The account ${user.Username} was successfully deleted.`);
    localStorage.clear();
    window.open('/register', '_self');
  };
  // Update Profile
  const handleUpdate = () => {
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');

    axios
      .put(
        `https://mymoviesapi2023.herokuapp.com/users/${user}`,
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      .then((response) => {
        alert('Your profile has been updated');
        localStorage.setItem('user', response.data.Username),
          console.log(response.data);
        window.open('/', '_self');
      })
      .catch((e) => {
        console.log('Error');
      });
  };

  useEffect(() => {
    getUserData();
  }, []);

  return (
    <Container>
      <Row>
        <h3>Profile</h3>
      </Row>
      <Form>
        <Form.Group className='mb-3' controlId='username'>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            onChange={(e) => setUsername(e.target.value)}
            value={username}
            type='text'
            placeholder='username'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={(e) => setPassword(e.target.value)}
            type='password'
            value={password}
            placeholder='Password'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='email'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type='email'
            placeholder='Enter new email'
          />
        </Form.Group>
        <Form.Group className='mb-3' controlId='birthday'>
          <Form.Label>Birthday:</Form.Label>
          <Form.Control
            onChange={(e) => setBirthday(e.target.value)}
            value={birthday}
            type='date'
            placeholder='birthday'
          />
        </Form.Group>
      </Form>
      <Row>
        <Button className='mt-2' onClick={handleUpdate}>
          Update your profile
        </Button>
        <Button className='mt-2 ml-4' onClick={handleDelete}>
          Delete your profile
        </Button>
      </Row>
      <Row className='fav-list'>
        <h4>Favorite Movies:</h4>
      </Row>

      <Row>
        {favoriteMoviesList.map((movie) => {
          return (
            <Col xs={12} md={6} lg={3} >
              <Link to={`/movies/${movie._id}`}>
                <Card.Img
                  className='mb-2'
                  key={movie._id}
                  src={movie.ImageURL}
                  alt={movie.Title}
                />
              </Link>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

ProfileView.propTypes = {
  user: propTypes.shape({
    Username: propTypes.string.isRequired,
    Password: propTypes.string.isRequired,
    Email: propTypes.string.isRequired,
    Birthday: propTypes.string.isRequired,
    FavoriteMovies: propTypes.array.isRequired,
  }),
  Director: propTypes.shape({
    Name: propTypes.string.isRequired,
    Bio: propTypes.string.isRequired,
    Birth: propTypes.string.isRequired,
  })
};
