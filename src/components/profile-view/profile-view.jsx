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

  // get user data from local storage and set it to user state variable
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
        setFavoriteMoviesList(
          props.movies.filter((movie) =>
            response.data.FavoriteMovies.includes(movie._id)
          )
        );
        console.log(response);
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
    <>
      <Row>
        <Col>
          <h3>Profile</h3>
        </Col>
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
      <Row className='d-grid gap-2'>
        <Button onClick={handleUpdate} size='md'>
          Update your profile
        </Button>
        <Button variant='danger' onClick={handleDelete}>
          Delete your profile
        </Button>
      </Row>

      <Row>
        <Col xs={12}>
          <h4>Favorite Movies:</h4>
        </Col>
      </Row>
      <Row>
        {favoriteMoviesList.map((movie) => {
          return (
            <Col xs={12} md={6} lg={3} key={movie._id} className='col'>
              <Link to={`/movies/${movie._id}`}>
                <Card.Img
                  className='mb-2'
                  src={movie.ImageURL}
                  alt={movie.Title}
                />
              </Link>
            </Col>
          );
        })}
      </Row>

      <Button variant='warning' onClick={() => props.onBackClick(null)}>
        Back
      </Button>
    </>
  );
}

ProfileView.propTypes = {
  profileview: propTypes.shape({
    Username: propTypes.string.isRequired,
    Password: propTypes.string.isRequired,
    Email: propTypes.string.isRequired,
    Birthday: propTypes.string.isRequired,
    FavoriteMovies: propTypes.array.isRequired,
  }),
};
