import React from 'react';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './registration-view.scss';

export function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birthday, setBirthday] = useState('');

  const handleRegister = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:8081/users', {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })
      .then((response) => {
        console.log(response);
        const data = response.data;
        alert('Registration was successful 👏 ');
        window.open('/', '_self'); // '__self' page will open in current tab
      })
      .catch((error) => {
        return alert(
          'Registration failed. Please make sure your username is at least 5 characters long 🤓 = ' +
            error
        );
      });
  };

  return (
    <div className='register-container border border-light shadow p-3 mb-5 rounded py-3 px-3'>
      <h3>Sign up for myMovies! 🍿</h3>
      <Form>
        <Form.Group controlId='formUsername'>
          <Form.Label>Username: </Form.Label>
          <Form.Control
            type='username'
            placeholder=' Enter username'
            pattern='[[a-zA-Z0-9]+'
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formPassword'>
          <Form.Label> Password: </Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter Password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId='formEmail'>
          <Form.Label>Email:</Form.Label>
          <Form.Control
          type='email'
          placeholder='Enter Email'
          onChange={(e) => setEmail(e.target.value)}
           />
           <Form.Text className='text-muted'>We'll never share your email with anyone else.</Form.Text>
        </Form.Group>
        <Form.Group controlId='formDate-Of-Birth'>
          <Form.Label>Date of Birth:</Form.Label>
          <Form.Control 
          type='date'
          placeholder='12/25/2022'
          onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Group>
        <Row>
        <Button type='submit' variant='primary' onClick={handleRegister}>Sign Up</Button>
        </Row>
      </Form>
    </div>
  );
}
