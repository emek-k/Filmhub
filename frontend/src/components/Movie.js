import React, { useEffect, useState } from 'react';
import axios from 'axios';
import InfiniteScroll from 'react-infinite-scroll-component';
import requests from '../requests';
import MovieDetails from './MovieDetails';
import '../css/movie.css';

const Movie = ({ selectedCategory }) => {
    const [movies, setMovies] = useState([]);
    const [selectedMovie, setSelectedMovie] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const apiCall = {
                    'popular': 'requestPopular',
                    'toprated': 'requestTopRated',
                    'trending': 'requestTrending',
                    'horror': 'requestHorror',
                    'upcoming': 'requestUpcoming'
                }[selectedCategory] || 'requestPopular';

                const response = await axios.get(`${requests[apiCall]}&page=${page}`);
                return response.data.results;
            } catch (error) {
                console.error("Error fetching movies:", error);
            }
        };

        fetchMovies().then(newMovies => {
            if (page === 1) {
                setMovies(newMovies || []);
            } else {
                setMovies(prevMovies => [...prevMovies, ...(newMovies || [])]);
            }
            if (!newMovies || newMovies.length < 20) { // assuming 20 is the max per page
                setHasMore(false);
            }
        });
    }, [selectedCategory, page]); // Dependency array includes both selectedCategory and page

    const fetchMoreMovies = () => {
        setPage(prevPage => prevPage + 1);
    };

    const handleMovieSelect = (movie) => {
        setSelectedMovie(movie);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    return (
        <>
            <InfiniteScroll
                dataLength={movies.length}
                next={fetchMoreMovies}
                hasMore={hasMore}
                loader={<h4>Loading...</h4>}
                endMessage={<p style={{ textAlign: 'center' }}>
                    <b>Yay! You have seen it all</b>
                </p>}
            >
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
            </InfiniteScroll>
            <MovieDetails isOpen={isModalOpen} onClose={handleCloseModal} movie={selectedMovie}></MovieDetails>
        </>
    );
};

export default Movie;
