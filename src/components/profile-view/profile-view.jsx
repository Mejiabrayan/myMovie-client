import React from 'react';
import { Card, Container, Col, Row, Button } from 'react-bootstrap';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { UpdateUser } from './update-user';
import { FavoriteMovies } from './favorite-movies';

export function ProfileView(props) {
  // Delcares a Hook
  const [user, setUser] = useState(props.user);
  const [movies, setMovies] = useState(props.movies);
  const [favoriteMovies, setFavoriteMovies] = useState([]); // inital empty array that holds your list of favorite movies
  const currentUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const getUser = () => {
    axios
      .get(`https://mymoviesapi2023.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        setFavoriteMovies(response.data.FavoriteMovies);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleDelete = () => {
    axios
      .delete(`https://mymoviesapi2023.herokuapp.com/users/${currentUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(`The account ${user.Username} was successfully deleted`);
        localStorage.clear();
        window.open('/register', 'self');
      })
      .catch((error) => {
        console.log(`there is a problem 🧐 ${error}`);
      });
  };

  return (
    <Container id="profile-form">
      <Row><h4>Your profile</h4></Row>
      <Row>
        <Col className="label">Username:</Col>
        <Col className="value">{user.Username}</Col>
        </Row>
        <Row className="mt-3">
        <Col className="label">Password:</Col>
        <Col className="value">******</Col>
        </Row>
        <Row className="mt-3">
        <Col className="label">Email:</Col>
        <Col className="value">{user.Email}</Col>
        </Row>
        <Row className="mt-3">
        <Col className="label">Birthday:</Col>
        <Col className="value">{user.Birthday}</Col>
        </Row>
        <Row className="mt-5"><h4>Your favorite movies</h4></Row>
        <Row className="mt-3">
          <FavoriteMovies
          movies={movies} 
          favoriteMovies={favoriteMovies} 
          currentUser={currentUser} 
          token={token}/>
        </Row>
        <UpdateUser user={user}/>
        <Button className="d-block mt-5" variant="danger" onClick={handleDelete}>Delete profile</Button>
    </Container>
  )
}