import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/profile.css';
import {Button} from "react-bootstrap";

const Profile = ({ userInfo }) => {
  const [movies, setMovies] = useState([]);
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  const fetchFavoriteMovies = async () => {
    if (userInfo && userInfo.Id) {
      try {
        const response = await axios.get(`http://localhost:3001/ulubione/${userInfo.Id}`);
        setMovies(response.data);
      } catch (error) {
        console.error('Error fetching favorite movies:', error);
      }
    }
  };

  useEffect(() => {
    fetchFavoriteMovies();
  }, [userInfo]);

  const handleNext = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const handlePrevious = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex - 1 + movies.length) % movies.length);
  };

  const currentMovie = movies[currentMovieIndex];


  const removeFromFavorites = async (movieId) => {
    try {
      console.log(`Attempting to remove movie ID: ${movieId} for user ID: ${userInfo.Id}`);
      await axios.delete(`http://localhost:3001/ulubione/${userInfo.Id}`, { data: { IDFilm: movieId } });
      fetchFavoriteMovies();
    } catch (error) {
      console.error('Error removing movie from favorites:', error);
    }
  };

  return (
    <div className="container">
      <div className="profile-container">
        <h1>Profile Page</h1>
        {userInfo && (
          <div>
            <p><strong>Username:</strong> {userInfo.Username}</p>
            <p><strong>Email:</strong> {userInfo.Email}</p>
          </div>
        )}

        <h2>Your Favorite Movies</h2>
        {currentMovie && (
          <div className="movie-feature">
            <div>
              <img src={`https://image.tmdb.org/t/p/w500${currentMovie.poster_path}`} alt={currentMovie.title} />
              <h3>{currentMovie.title}</h3>
              <Button variant="outline-danger" onClick={handlePrevious}>&lt;</Button>
              <Button variant="outline-danger ms-5" onClick={() => removeFromFavorites(currentMovie.id)}>Remove from favourite</Button>
              <Button variant="outline-danger ms-5" onClick={handleNext}>&gt;</Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;
