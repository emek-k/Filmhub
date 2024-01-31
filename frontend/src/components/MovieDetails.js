import '../css/MovieDetails.css';
import {useContext, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import UserInfoContext from "./UserInfoContext";

const MovieDetails = ({ isOpen, onClose, movie, userId }) => {
  const userInfo = useContext(UserInfoContext);

  const [favorites, setFavorites] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isAddition, setIsAddition] = useState(true);
  const isFavorite = favorites.some(favMovie => favMovie.id === movie?.id);

  if (!isOpen) return null;

  const handleFavoritesToggle = async () => {
    try {
      if (isFavorite) {
        await axios.delete(`http://localhost:3001/ulubione/${userInfo.Id}`, { data: { IDFilm: movie.id } });
        setFavorites(favorites.filter(favMovie => favMovie.id !== movie.id));
        setAlertMessage(`Movie ${movie.title} was successfully removed from the list.`);
        setIsAddition(false);
      } else {
        await axios.post(`http://localhost:3001/ulubione/${userInfo.Id}`, { IDFilm: movie.id });
        setFavorites([...favorites, movie]);
        setAlertMessage(`Movie ${movie.title} was successfully added to the list.`);
        setIsAddition(true);
      }
    } catch (error) {
      console.error('Error updating favorites:', error);
    }
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000);
  };

  return (
    <div className="fullscreen-modal">
      <div className="modal-content text-black">
        {showAlert && (
          <div className={`alert ${isAddition ? 'alert-success' : 'alert-danger'} alert-fixed-top-right`}>
            {alertMessage}
          </div>
        )}
        <button onClick={onClose} className="close-button">&times;</button>
        <h1>{movie?.title}</h1>
        <p>{movie?.overview}</p>
        <h2>Rating {movie?.vote_average}</h2>
        <h2>Votes {movie?.vote_count}</h2>
        <img
          src={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          alt={movie?.title}
          className="img-fluid"
        />
        <button
          onClick={handleFavoritesToggle}
          className={`btn ${isFavorite ? 'btn-danger' : 'btn-primary'} mt-3`}
        >
          {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
        </button>
      </div>
    </div>
  );
}

export default MovieDetails;
