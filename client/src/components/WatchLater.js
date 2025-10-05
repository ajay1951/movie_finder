// client/src/components/WatchLater.js
import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import './MovieList.css'; // Reusing the movie list styles for the grid and cards

// Import our custom Axios instance for authenticated API calls
import api from '../api/axios';

const WatchLater = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  // This function talks to our protected backend to get the user's saved movies
  useEffect(() => {
    const getFavoriteMovies = async () => {
      try {
        // Use our authenticated 'api' instance. The token is sent automatically.
        const response = await api.get('api/favorites');
        setFavoriteMovies(response.data);
      } catch (error) {
        console.error("Error fetching favorite movies:", error);
        toast.error("Could not fetch your Watch Later list. Please try again later.");
      } finally {
        // This will run whether the request succeeded or failed
        setLoading(false);
      }
    };

    getFavoriteMovies();
  }, []); // The empty array [] ensures this effect runs only once when the component mounts

  // This function talks to our protected backend to remove a movie
  const handleRemoveFavorite = async (movieId, movieTitle) => {
    try {
      // Use our authenticated 'api' instance to send a DELETE request
      await api.delete(`api/favorites/${movieId}`);
      
      // Update the state to remove the movie from the UI instantly for a better UX
      setFavoriteMovies(prevMovies => prevMovies.filter(movie => movie._id !== movieId));
      toast.success(`"${movieTitle}" removed from your list.`);
    } catch (error) {
      console.error("Error removing movie from favorites:", error);
      toast.error("Failed to remove movie. Please try again.");
    }
  };

  // Display a loading message while fetching data
  if (loading) {
    return <div>Loading your Watch Later list...</div>;
  }

  return (
    <div>
      <h1>My Watch Later List</h1>
      {favoriteMovies.length > 0 ? (
        <div className="movie-grid">
          {favoriteMovies.map(movie => (
            <div key={movie._id} className="movie-card-container">
              <div className="movie-card">
                {/* OMDb posters are full URLs, so we don't need to add a prefix */}
                <img
                  src={movie.poster_path !== 'N/A' ? movie.poster_path : 'https://via.placeholder.com/500x750.png?text=No+Image'}
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
              </div>
              <button
                className="remove-btn"
                onClick={() => handleRemoveFavorite(movie._id, movie.title)}
              >
                &times; {/* A simple 'X' icon */}
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>Your watch later list is empty. Go find some movies to add!</p>
      )}
    </div>
  );
};

export default WatchLater;