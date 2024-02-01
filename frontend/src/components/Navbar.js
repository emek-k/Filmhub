import axios from 'axios';
import requests from "../requests";
import MovieDetails from './MovieDetails';
import '../css/Navbar.css';
import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/Navbar.css';



const NavigationBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const onSearch = (event) => {
    event.preventDefault();
    if (searchTerm.trim() === '') {
      setSearchResults([]);
      return;
    }

    const searchUrl = requests.searchMovies(searchTerm);
    axios.get(searchUrl)
        .then(response => {
          setSearchResults(response.data.results);
        })
        .catch(error => {
          console.error("Error during movie search:", error);
        });
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
    setSearchResults([]);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleCloseSearch = () => {
    setSearchResults([]);
  };


  return (
      <>
        <Navbar expand="lg" className="bg-body-tertiary" bg="dark" data-bs-theme="dark">
          <Container fluid>
            <Navbar.Brand href="/">
              <img
                  src="/filmhub-logo-white.png"
                  width="80"
                  height="80"
                  className="d-inline-block align-top"
                  alt="React Bootstrap logo"
              />{' '}
              <span className="display-4 fw-bold">FILMHUB</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll text0szi" className={"display-6"}>
              <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                <Nav.Link href="/profile">Profile</Nav.Link>
              </Nav>
              <Form className="d-flex" onSubmit={onSearch}>
                  {/*{userInfo && (*/}
                  {/*    <Nav.Link className="navbar-username" href="/profile">Hello, {userInfo.Username}</Nav.Link>*/}
                  {/*)}*/}
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline-success" type="submit">Search</Button>
                  {!userInfo && (
                      <>
                          <Button variant="outline-secondary" className="login-button ms-2" onClick={() => navigate('/login')}>Log in</Button>
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
        {searchResults.length > 0 && (
            <div className="search-results-container row text-center bg-dark">
              <Button className="close-search m-2" onClick={handleCloseSearch}>&times;</Button>
              <h1>SEARCH RESULTS</h1>
              {searchResults.map((movie, index) => (
                  <div className="search-result-item col-md-4 p-2" key={index}
                       onClick={() => handleMovieSelect(movie)}>
                    <div className="border border-primary text-center custom-pointer">
                      <h1>{movie?.title}</h1>
                      <img
                          className='img-fluid'
                          style={{height: '200px', objectFit: 'cover'}}
                          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
                          alt={movie?.title}
                      />
                    </div>
                  </div>
              ))}
            </div>
        )}
        <MovieDetails isOpen={isModalOpen} onClose={handleCloseModal} movie={selectedMovie}/>
      </>
  );
};

export default NavigationBar;
