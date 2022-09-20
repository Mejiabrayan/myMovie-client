import React from 'react';
import { Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import axios from 'axios';

export function UpdateUser({ user }) {
  // Declaring a Hook that will be used to store the user's input in the form
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const [values, setValues] = useState({
    usernameError: '',
    passwordError: '',
    emailError: '',
  });

  // Validate user input
  const validate = () => {
    let isReq = true;

    if (!username) {
      setValues({
        ...values,
        usernameError: 'Username is required',
      });
      isReq = false;
    } else if (username.length < 5) {
      setValues({
        ...values,
        usernameError: 'Username must be 5 characters or more',
      });
      isReq = false;
    }
    if (!password) {
      setValues({
        ...values,
        passwordError: 'Password required',
      });
      isReq = false;
    } else if (password.length < 6) {
      setValues({
        ...values,
        passwordError: 'Password must have 6 characters or more',
      });
      isReq = false;
    }
    if (!email) {
      setValues({
        ...values,
        emailError: 'e-mail is required',
      });
      isReq = false;
    } else if (email.indexOf('@') === -1) {
      setValues({
        ...values,
        emailError: 'Must be a valid e-mail',
      });
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault;

    let isReq = validate();

    if (isReq) {
      const token = localStorage.getItem('token');
      axios
        .put(
          `
      https://mymoviesapi2023.herokuapp.com/users/${user.Username}`,
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
          console.log(response);
          alert('Profile was succesfully updated');
          window.open('/', '_self');
        })
        .catch((error) => {
          console.log(`There is an ${error}`);
          alert('Unable to update profile');
        });
    }
  };

  <Form className='profile-form' onSubmit={(e) => handleSubmit(e)}>
    <Form.Group>
      <h3>Want to change something?</h3>
      <Form.Label>Username:</Form.Label>
      <Form.Control
        type='text'
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
        placeholder='enter username'
      />
      {values.usernameError && <p>{values.usernameError}</p>}
    </Form.Group>
    <Form.Group>
      <Form.Label>Password:</Form.Label>
      <Form.Control
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
        placeholder='enter password'
      />
      {values.passwordError && <p>{values.passwordError}</p>}
    </Form.Group>
    <Form.Group>
      <Form.Label> Email Address </Form.Label>
      <Form.Control
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      {/* Displays Error */}
      {values.emailError && <p>{values.emailError}</p>}
      <Form.Group>
        <Form.Label> Birthday </Form.Label>
        <Form.Control
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
      </Form.Group>
      <Button variant='primary' type='submit'>
        Update
      </Button>
    </Form.Group>
  </Form>;
}
