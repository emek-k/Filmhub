import '../css/MovieDetails.css';
import {useContext, useEffect, useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from "axios";
import UserInfoContext from "./UserInfoContext";
import {Button, Form} from "react-bootstrap";

const MovieDetails = ({ isOpen, onClose, movie }) => {
  const userInfo = useContext(UserInfoContext);

  const [favorites, setFavorites] = useState([]);
  const [alertMessage, setAlertMessage] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [isAddition, setIsAddition] = useState(true);
  const isFavorite = favorites.some(favMovie => favMovie.id === movie?.id);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showComments, setShowComments] = useState(false);

  useEffect(() => {
    const fetchComments = async () => {
      if (!movie || !movie.id) return;

      try {
        const response = await axios.get(`http://localhost:3001/komentarze/${movie.id}`);
        setComments(response.data);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [movie]);

  const handlePostComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    try {
      await axios.post('http://localhost:3001/komentarze', {
        IDUzytkownik: userInfo.Id,
        IDFilm: movie.id,
        Komentarz: newComment,
      });

      setNewComment('');
      const response = await axios.get(`http://localhost:3001/komentarze/${movie.id}`);
      setComments(response.data);
    } catch (error) {
      console.error('Error posting comment:', error);
    }
  };

  const notLoggedInButtons = () => {
    if (!userInfo) {
      setAlertMessage("You have to be logged in to do this.");
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 3000);
    } else {
      setShowComments(!showComments);
    }
  };
  const handleFavoritesToggle = async () => {
    try {
      if (!userInfo){
        notLoggedInButtons();
      }
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
  if (!isOpen) return null;

  return (
    <div className="fullscreen-modal">
      <div className="modal-content text-black scrollable-modal-content">
        {showAlert && (
          <div className={`alert ${isAddition ? 'alert-success' : 'alert-danger'} alert-fixed-top-right`}>
            {alertMessage}
          </div>
        )}
        <button onClick={onClose} className="close-button">&times;</button>

        <div className="row">
          <div className="col-md-12">
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

            <button className="btn btn-secondary mt-3" onClick={notLoggedInButtons}>
              Show Comments
            </button>

            {showComments && (
              <div className="mt-3">
                <h2>Comments</h2>
                <Form onSubmit={handlePostComment} className="text-center">
                  <Form.Group className="mb-2">
                    <Form.Control
                      as="textarea"
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Add a comment"
                      rows={3}
                    />
                  </Form.Group>
                  <Button type="submit" variant="primary">Post Comment</Button>
                </Form>

                <div className="movie-comments mt-3">
                  {comments.map(comment => (
                    <div key={comment.Id} className="comment-border p-2 my-2">
                      <strong>{comment.Username}: </strong>
                      <p>{comment.Komentarz}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default MovieDetails;
