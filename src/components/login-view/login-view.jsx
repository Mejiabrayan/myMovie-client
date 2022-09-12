import axios from 'axios';
import React, { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';

import { FaUser } from 'react-icons/fa';
import images from '../../images/cinema.jpg';
import './login-view.scss';

// LoginView is a child component of MainView and is rendered as a child of MainView when the user is not logged in (i.e. when the user is not authenticated) and the state of the user is set to null.
export function LoginView(props) {
  const [username, setUsername] = useState(''); // initial value of username is an empty string
  const [password, setPassword] = useState(''); // initial value of password is an empty string

  // handleSubmit is a function that is called when the user clicks the submit button. It calls the onLoggedIn function that was passed to the LoginView component as a prop. The onLoggedIn function is defined in MainView and updates the user state to the username that was entered in the form.
  const handleSubmit = (e) => {
    e.preventDefault();
    // Send a request to the server for authentication
    axios
      .post('https://mymoviesapi2023.herokuapp.com/login', {
        Username: username,
        Password: password,
      })
      .then((response) => {
        // response is the data that the server sends back to the client
        const data = response.data;
        console.log('User successfully logged in');
        props.onLoggedIn(data); // calls the onLoggedIn function that was passed to the LoginView component as a prop. The onLoggedIn function is defined in MainView and updates the user state to the username that was entered in the form.
      })
      .catch((e) => {
        console.log('no such user');
      });
  };

  // The form has two input fields for the username and password, and a submit button. The input fields are controlled components, which means that their values are controlled by the state of the component. The values of the input fields are set to the username and password state variables, and when the user types in the input fields, the state variables are updated using the setUsername and setPassword functions.
  return (
    <Row>
      <Col lg={4} md={6} sm={12} className='text-center p-2'>
        <h2 className='display-1'>MyFlix 🍿 </h2>
        <FaUser className='icon-img' alt='icon' />
        <Form>
          <Form.Group className='mb-3' controlId='formUsername'>
            <Form.Control
              type='username'
              placeholder='Enter Username'
              // className='w-50'
              onChange={(e) => setUsername(e.target.value)} // when the user types in the input field, the setUsername function is called with the value of the input field as an argument
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formPassword'>
            <Form.Control
              type='password'
              placeholder='Enter Password'
              // className='w-50'
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className='text-left'>
          <Form.Group className='mb-3' controlId='formBasicCheckbox'>
            <Form.Check type='checkbox' label='Remember me' />
          </Form.Group>
          </div>

          <Button
            className='mb-5'
            variant='primary'
            type='submit'
            onClick={handleSubmit}
          >
            Submit
          </Button>
          <div className='text-left mt-3'>
            <a href='#'> <small className='reset ml-2'>Forgot Password?</small></a>
          </div>
        </Form>
      </Col>
      <Col lg={8} md={6} sm={12}>
        <img src={images} className='w-100' alt="image" />
      </Col>
    </Row>
  );
}
