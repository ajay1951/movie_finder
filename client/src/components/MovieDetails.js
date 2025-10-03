// src/components/MovieDetails.js
import './MovieDetails.css';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MovieDetails = () => {
  const [movie, setMovie] = useState(null);
  const { id } = useParams(); // This will be the imdbID
  const API_KEY = 'YOUR_OMDB_API_KEY'; // Replace with your key

  useEffect(() => {
    // For OMDb, we use 'i=' to fetch by imdbID
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(`http://www.omdbapi.com/?i=${id}&apikey=${API_KEY}`);
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    fetchMovieDetails();
  }, [id]);

  const handleAddToFavorites = async () => {
    if (!movie) return;

    // Adjust the data structure to match our backend model
    const movieData = {
      tmdbId: movie.imdbID, // Use imdbID and name it tmdbId as in the model
      title: movie.Title,
      poster_path: movie.Poster,
      overview: movie.Plot,
    };

    try {
      const response = await axios.post('http://localhost:5000/favorites/add', movieData);
      alert(response.data);
    } catch (error) {
      console.error('Error adding to favorites:', error);
      alert('Failed to add movie to favorites.');
    }
  };
  
  if (!movie) {
    return <div>Loading...</div>;
  }

  // --- NEW JSX TO DISPLAY ALL THE DETAILS ---
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
        
        <button onClick={handleAddToFavorites}>Add to Watch Later</button>

        {/* -- RATINGS SECTION -- */}
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

        {/* -- CAST AND CREW SECTION -- */}
        <div className="details-section">
          <h2>Cast & Crew</h2>
          <div className="cast-crew-list">
            <p><strong>Director:</strong> {movie.Director}</p>
            <p><strong>Writer:</strong> {movie.Writer}</p>
            <p><strong>Actors:</strong> {movie.Actors}</p>
          </div>
        </div>
        
        {/* -- WHERE TO WATCH (IMPORTANT NOTE) -- */}
        <div className="details-section">
            <h2>Where to Watch</h2>
            <p><em>Note: The OMDb API does not provide streaming information.</em></p>
        </div>

      </div>
    </div>
  );
};

export default MovieDetails;