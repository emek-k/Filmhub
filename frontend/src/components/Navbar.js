import { Button, Container, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/navbar.css';

const NavigationBar = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('userId');
    setUserInfo(null);
    navigate('/login');
  };

  useEffect(() => {
    const id = localStorage.getItem('userId');
    console.log("Fetched user ID:", id);
    if (id) {
      fetchUserInfo(id);
    }
  }, []);

  const fetchUserInfo = async (id) => {
    try {
      const response = await axios.get(`http://localhost:3001/uzytkownicy/${id}`);
      setUserInfo(response.data);

      console.log("Fetched user info:", response.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            navbarScroll
          >
            <Nav.Link href="/">Link</Nav.Link>
            <Nav.Link href="#action2">Link</Nav.Link>
            <NavDropdown title="Link" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Another action
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action5">
                Something else here
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Form className="d-flex">
            {userInfo && (
                <Nav.Link className="navbar-username" href="/profile">Hello, {userInfo.Username}</Nav.Link>
            )}
            <Form.Control type="search" placeholder="Search" className="me-2" aria-label="Search" />
            <Button variant="outline-success">Search</Button>
            {!userInfo && (
              <>
                <Button variant="outline-secondary" className="login-button ms-2" onClick={() => navigate('/login')}>Login</Button>
                <Button variant="outline-info" className="signup-button ms-2" onClick={() => navigate('/signup')}>Sign Up</Button>
              </>
            )}
            {userInfo && (
                <Button variant="outline-danger" onClick={handleLogout} className="ms-2">Logout</Button>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
