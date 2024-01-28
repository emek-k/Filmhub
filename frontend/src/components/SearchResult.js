import React, { useEffect, useState } from 'react';
import axios from 'axios';
import requests from '../requests';
import MovieDetails from './MovieDetails';
import '../css/movie.css';

const SearchResults = ({ searchQuery }) => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchSearchResults = async () => {
            if (searchQuery.trim() === '') return;

            try {
                const searchUrl = requests.searchMovies(searchQuery);
                const response = await axios.get(searchUrl);
                setMovies(response.data.results || []);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        fetchSearchResults();
    }, [searchQuery]);

    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="row">
                {movies.map((movie, index) => (
                    <div className="col-md-4 p-2" key={index} onClick={() => handleMovieSelect(movie)}>
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
            {movies.length === 0 && <p>No movies found.</p>}
            <MovieDetails isOpen={isModalOpen} onClose={handleCloseModal} movie={selectedMovie} />
        </>
    );
};

export default SearchResults;
