import React from 'react';
import { Nav, Navbar, Button, Container } from 'react-bootstrap';

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
    <Navbar
      className='main-nav'
      variant='dark'
      bg='dark'
      sticky='top'
      expand='lg'
    >
      <Container className='fluid'>
        <Navbar.Brand className='navbar-logo' href='/'>
          myMovies 🍿
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav ' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='ml-auto'>
            {isAuth() && <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>}
            {isAuth() && (
              <Button variant='link' onClick={logOut}>
                Logout
              </Button>
            )}
            {/* If they're not authenticated then use should either sign-in or sign-up */}
            {!isAuth() && <Nav.Link href='/'>Sign-in</Nav.Link>}
            {!isAuth() && <Nav.Link href='/register'>Sign-up</Nav.Link>}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
