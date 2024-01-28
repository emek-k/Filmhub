import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import requests from "../requests";
import MovieDetails from './MovieDetails'; // Import MovieDetails
import '../css/NavBar.css'; // Assuming you have a CSS file for styling

const NavigationBar = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onSearch = (event) => {
    event.preventDefault(); // Prevent default form submission behavior
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
    setSearchResults([]); // Clear search results after selection
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
            <Navbar.Brand href="#">
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
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
                <Nav.Link href="#action1">Home</Nav.Link>
                <Nav.Link href="#action2">Link</Nav.Link>
                <NavDropdown title="Link" id="navbarScrollingDropdown">
                  <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <Form className="d-flex" onSubmit={onSearch}>
                <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="outline-success" type="submit">Search</Button>
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
