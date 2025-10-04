// client/src/components/MovieDetails.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './MovieDetails.css';

// Import the original axios for public API calls
import axios from 'axios';
// Import our new custom instance for authenticated API calls
import api from '../api/axios';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams(); // This will be the imdbID from the URL
  const API_KEY = 'e77ec6f9'; // Replace with your OMDb key
  const token = localStorage.getItem('token');

  useEffect(() => {
    // This function fetches from the PUBLIC OMDb API
    const fetchMovieDetails = async () => {
      try {
        // Use the original 'axios' for this external request
        const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}&plot=full`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
        toast.error('Could not fetch movie details.');
      }
    };
    fetchMovieDetails();
  }, [id]);

  // This function talks to OUR PROTECTED backend
  const handleAddToFavorites = async () => {
    if (!movie) return;

    // The data structure our backend's Mongoose model expects
    const movieData = {
      tmdbId: movie.imdbID, // We use imdbID as the unique identifier
      title: movie.Title,
      poster_path: movie.Poster,
      overview: movie.Plot,
    };

    

    try {
      // Use our new authenticated 'api' instance for this private request
      await api.post('/favorites/add', movieData);
      toast.success(`${movie.Title} added to your Watch Later list!`);
    } catch (error) {
      toast.error(error.response?.data?.msg || 'Failed to add movie.');
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-details">
      <img
        src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/500x750.png?text=No+Image'}
        alt={movie.Title}
      />
      <div className="details-content">
        <h1>{movie.Title} ({movie.Year})</h1>
        <p className="details-meta">{movie.Rated} | {movie.Runtime} | {movie.Genre}</p>
        <p>{movie.Plot}</p>

        {/* Only show the button if the user is logged in */}
        {token && (
          <button onClick={handleAddToFavorites}>
            Add to Watch Later
          </button>
        )}

        <div className="details-section">
          <h2>Ratings</h2>
          {movie.Ratings && movie.Ratings.length > 0 ? (
            <ul className="ratings-list">
              {movie.Ratings.map((rating, index) => (
                <li key={index} className="rating-item">
                  <strong>{rating.Source}:</strong> {rating.Value}
                </li>
              ))}
            </ul>
          ) : (
            <p>No ratings available.</p>
          )}
        </div>

        <div className="details-section">
          <h2>Cast & Crew</h2>
          <div className="cast-crew-list">
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Writer:</strong> {movie.Writer}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;