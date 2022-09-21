import React from 'react';
import { Card, Button } from 'react-bootstrap';
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



  // useEffect is a hook that is used to perform side effects in function components
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

  // useEffect is a hook that is used to perform side effects in function components

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
    <Card id='profile-form' className='mt-3'>
      <Card.Body>
        <Card.Title>Profile</Card.Title>
      </Card.Body>
      <Card.Body>
        <Card.Text className='label'>Username:</Card.Text>
        <Card.Text className='value'>{user.Username}</Card.Text>
      </Card.Body>

      <Card.Body className='mt-3'>
        <Card.Text className='label'>Password:</Card.Text>
        <Card.Text className='value'>******</Card.Text>
      </Card.Body>
      <Card.Body className='mt-3'>
        <Card.Text className='label'>Email:</Card.Text>
        <Card.Text className='value'>{user.Email}</Card.Text>
      </Card.Body>
      <Card.Body className='mt-3'>
        <Card.Text className='label'>Birthday:</Card.Text>
        <Card.Text className='value'>{user.Birthday}</Card.Text>
      </Card.Body>
      <Card.Body className='mt-3'>
       <Button variant='secondary' href={`/user-update/${currentUser}`}> Update Profile</Button>
      </Card.Body>
      <Card.Body className='mt-5'>
        <h4>Your favorite movies</h4>
      </Card.Body>
      <Card.Body className='mt-3'>
        <FavoriteMovies
          movies={movies}
          favoriteMovies={favoriteMovies}
          currentUser={currentUser}
          token={token}
        />
      </Card.Body>
      <Card.Body className='mt-5'>
        <UpdateUser user={user} />
        <Button
          className='d-block mt-5'
          variant='danger'
          onClick={handleDelete}
        >
          Delete profile
        </Button>
      </Card.Body>
    </Card>
  );
}
