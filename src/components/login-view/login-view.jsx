import React, { useState } from 'react';
import { Form, Container, Row, Button, Card, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import images from '../../images/myMovies-Background.jpeg';
import {BiMoviePlay} from 'react-icons/bi';

export function LoginView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // Declare hook for each input
  const [usernameErr, setUsernameErr] = useState('');
  const [passwordErr, setPasswordErr] = useState('');

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr('Username Required');
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr('Username must be 2 characters long');
      isReq = false;
    }
    if (!password) {
      setPasswordErr('Password Required');
      isReq = false;
    } else if (password.length < 4) {
      setPasswordErr('Password must be 6 characters long');
      isReq = false;
    }

    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      /* Send request to the server for authentication */
      axios
        .post('https://mymoviesapi2023.herokuapp.com/login', {
          Username: username,
          Password: password,
        })
        .then((res) => {
          const data = res.data;
          props.onLoggedIn(data);
        })
        .catch((err) => {
          console.log(`no such user ${err}`);
          alert('Your username or password is incorrect');
        });
    }
  };

  // sets the background image for the login view
  var background = {
    backgroundImage: `url(${images})`,

    backgroundSize: 'cover',
    backgroundBlendMode: 'darken',
    backgroundColor: 'rgba(0,0,0,0.6)',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    height: '100vh',
    width: '100%',
  };

  return (
    <div className='main-container' style={background}>
      <Container>
        <Row className='vh-100 d-flex justify-content-center align-items-center'>
          <Col md={8} lg={6} xs={12}>
            <div>
              <Card className='shadow ' style={{background: ' #09121f', color: '#fff'}}>
                <Card.Body>
                  <div className='mb-3 mt-md-4'>
                    <h2 className='fw-bold text-uppercase'>myMovies <BiMoviePlay/></h2>
                    <p className='mb-5'>Login to your account</p>
                    <div className='mb-3'>
                      <Form>
                        <Form.Group className='mb-3' controlId='formUsername'>
                          <Form.Label className='text-center'>
                            Username
                          </Form.Label>
                          <Form.Control
                            type='text'
                            placeholder='Enter username'
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                          />
                          {/* code added here to display validation error */}
                          {usernameErr && <p>{usernameErr}</p>}
                        </Form.Group>

                        <Form.Group className='mb-3' controlId='formPassword'>
                          <Form.Label>Password</Form.Label>
                          <Form.Control
                            type='text'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          {/* code added here to display validation error */}
                          {passwordErr && <p>{passwordErr}</p>}
                        </Form.Group>
                        <div className='d-grid'>
                          <Button
                            className='mt-2'
                            variant='primary'
                            type='submit'
                            onClick={handleSubmit}
                          >
                            Login
                          </Button>
                        </div>
                      </Form>
                      <div className='mt-3'>
                        <p className=' mb-0 text-center'>
                          {' '}
                          Don't have an account?{' '}
                          <Link to={`/register`}>Register</Link>
                        </p>
                      </div>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
