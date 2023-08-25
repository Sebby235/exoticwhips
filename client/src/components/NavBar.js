import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import {Link} from 'react-router-dom'

function NavBar() {
  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">ExoticWhips</Navbar.Brand>
          <Nav className="me-auto">
            <Link to='/' className='nav-link'>Home</Link>
            <Link to='/about' className='nav-link'>About</Link>
            <Link to='/cars' className='nav-link'>Cars</Link>
            <Link to='/orders' className='nav-link'>Orders</Link>
            <Link to='/reviews' className='nav-link'>Reviews</Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
