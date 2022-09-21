import React from 'react';
import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, Redirect} from 'react-router-dom';

import { Button, Form, Row } from 'react-bootstrap';
import axios from 'axios';
import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  // Hook errors
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');

  const validate = () => {
    let isReq = true;
    if (!username) {
     setUsernameError('username is required');
      isReq = false;
    } else if (username.length < 2) {
      setUsernameError('username must be at least 5 characters or more');
      isReq = false;
    }
    if (!password) {
     setPasswordError('password is required');
      isReq = false;
    } else if (password.length < 6) {
     setPasswordError('password must be 6 characters or more');
      isReq = false;
    }
    if (!email) {
      setEmailError('Email is required');
    } else if (email.indexOf('@') === -1) {
      setEmailError('Not a valid email');
    }
    return isReq;
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      axios
        .post('https://mymoviesapi2023.herokuapp.com/users', {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert('Registration was successful 👏 ');
          window.open('/', '_self'); // '__self' page will open in current tab
        })
        .catch((error) => {
          return alert(
            `Registration failed. Please make sure your username is at least 5 characters long 🤓 = ${error}`
          );
        });
    }
  };

  return (
    <div className='register-container border border-light shadow p-3 mb-5 rounded py-3 px-3'>
      <h3>Sign up for myMovies! 🍿</h3>
      <Form>
        <Form.Group controlId='formUsername'>
          <Form.Label>Username: </Form.Label>
          <Form.Control
            type='username'
            value={username}
            placeholder=' Enter username'
            pattern='[[a-zA-Z0-9]+'
            onChange={(e) => setUsername(e.target.value)}
          />
          {setUsername && <p>{usernameError}</p>}
        </Form.Group>
        <Form.Group controlId='formPassword'>
          <Form.Label> Password: </Form.Label>
          <Form.Control
            type='password'
            value={password}
            placeholder='Enter Password'
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          {setPassword && <p>{passwordError}</p>}
        </Form.Group>
        <Form.Group controlId='formEmail'>
          <Form.Label>Email:</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter Email'
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          {setEmail && <p>{emailError}</p>}
          <Form.Text className='text-muted'>
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>
        <Form.Group controlId='formDate-Of-Birth'>
          <Form.Label>Date of Birth:</Form.Label>
          <Form.Control
            type='date'
            value={birthday}
            placeholder='12/25/2022'
            required
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>
        <Row>
          <Button  type='submit' variant='primary' onClick={handleRegister}>
            Sign Up
          </Button>
        </Row>
      </Form>
    </div>
  );
}
