import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

// LoginView is a child component of MainView and is rendered as a child of MainView when the user is not logged in (i.e. when the user is not authenticated) and the state of the user is set to null.
export function LoginView({ onLoggedIn }) {
  const [username, setUsername] = useState(''); // initial value of username is an empty string
  const [password, setPassword] = useState(''); // initial value of password is an empty string

  // handleSubmit is a function that is called when the user clicks the submit button. It calls the onLoggedIn function that was passed to the LoginView component as a prop. The onLoggedIn function is defined in MainView and updates the user state to the username that was entered in the form.
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    // Send a request to the server for authentication
    // then call props.onLoggedIn(username)
    onLoggedIn(username);
  };

  return (
    <Form>
      <Form.Group className='mb-3' controlId='formUsername'>
        <Form.Label> Username: </Form.Label>
        <Form.Control
          type='username'
          placeholder="Enter Username"
          onChange={(e) => setUsername(e.target.value)}
        />
      </Form.Group>
      <Form.Group controlId='formPassword'>
        <Form.Label> Password: </Form.Label>
        <Form.Control
          type='password'
          placeholder="Enter Password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button variant='primary' type='submit' onClick={handleSubmit}>Submit</Button>
      </Form.Group>
    </Form>
  )
}
