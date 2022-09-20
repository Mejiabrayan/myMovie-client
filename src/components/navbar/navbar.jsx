import React from 'react';
import { Nav, Navbar, Button, Container } from 'react-bootstrap';

export function MenuBar({ user }) {
  // Sign ou method
  const onLoggedOut = () => {
    localStorage.clear();
    window.open('/', '_self');
  };

  // Token Method
  const isAuth = () => {
    if (typeof window === 'undefined') {
      return false;
    }
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
          myMovies
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='responsive-navbar-nav ' />
        <Navbar.Collapse id='responsive-navbar-nav'>
          <Nav className='me-auto'>
            {isAuth() && <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>}
            {isAuth() && (
              <Button
                variant='link'
                onClick={() => {
                  this.onLoggedOut();
                }}
              >
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
