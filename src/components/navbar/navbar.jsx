import React from 'react';
import { Nav, Navbar, Button, Container } from 'react-bootstrap';
import './navbar.scss';
import VisibilityFilterInput from '../visibility-filter-input/visibility-filter-input';
import { BiMoviePlay } from 'react-icons/bi';
import visibilityFilterInput from '../visibility-filter-input/visibility-filter-input';

export function MenuBar() {
  const user = localStorage.getItem('user');

  // Sign out method
  const logOut = (e) => {
    e.preventDefault();
    localStorage.clear();
    window.open('/', '_self');
  };

  // Conditional rendering of the menu bar
  const isAuth = () => {
    if (typeof window === 'undefined') {
      return false;
    }
    // If user is logged in return true else return false and render the login button in the menu bar
    if (localStorage.getItem('token')) {
      return localStorage.getItem('token');
    } else {
      return false;
    }
  };

  return (
    <Navbar className='main-nav ' sticky='top' expand='lg'>
      <Container>
        <Navbar.Brand className='navbar-logo' href='/'>
          <BiMoviePlay className='navbar-logo-icon' />
        </Navbar.Brand>
        <Navbar.Toggle
          aria-controls='responsive-navbar-nav '
          className='menuBurger'
        />
        <Navbar.Collapse
          id='responsive-navbar-nav'
          className='justify-content-center'
        >
          <Nav className='me-auto nav'>
            {isAuth() && (
              <Nav.Link className='current-user' href={`/users/${user}`}>
                {user}
              </Nav.Link>
            )}
            {isAuth() && (
              <Button variant='link' onClick={logOut}>
                Logout
              </Button>
            )}
            {/* If they're not authenticated then use should either sign-in or sign-up */}
            {!isAuth() && (
              <Nav.Link className='nav-links' href='/'>
                Sign-in
              </Nav.Link>
            )}
            {!isAuth() && (
              <Nav.Link className='nav-links' href='/register'>
                Sign-up
              </Nav.Link>
            )}
          </Nav>
          {/* displays visibilityfilterinput only when a user logged in */}
          {isAuth() && <VisibilityFilterInput />}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
