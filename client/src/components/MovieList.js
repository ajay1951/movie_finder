// client/src/components/MovieList.js

// --- Imports are now reordered to follow best practices ---
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // You already had this - great!
import './MovieList.css';
// We don't need MovieDetails.css here, so it's removed.

const MovieList = () => {
  // State for the list of movies
  const [movies, setMovies] = useState([]);
  // State for the user's search query
  const [searchTerm, setSearchTerm] = useState('');
  // State for displaying an error message
  const [error, setError] = useState(null);

  // --- Best Practice: Using an Environment Variable for the API Key ---
  // Remember to create a .env.local file in your /client folder for this.
  const API_KEY = process.env.REACT_APP_OMDB_API_KEY || 'e77ec6f9';

  // Function to fetch movies from OMDb API
  const fetchMovies = async (query) => {
    setError(null); // Reset error on new search
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setError(response.data.Error);
      }
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('An error occurred while fetching data.');
    }
  };

  // useEffect to perform an initial search when the component loads
  useEffect(() => {
    fetchMovies('avengers'); // Perform a default search
  }, []);

  // Handler for the form submission
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetchMovies(searchTerm);
    }
  };

  return (
    <div>
      <h1>Movie Search</h1>
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>

      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="movie-grid">
          {movies.map(movie => (
            // --- THIS IS THE FIX ---
            // We wrap the entire card div in the <Link> component.
            // The 'key' is moved to the Link, and the 'to' prop creates the URL.
            <Link to={`/movie/${movie.imdbID}`} key={movie.imdbID} className="movie-card-link">
              <div className="movie-card">
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/500x750.png?text=No+Image'}
                  alt={movie.Title}
                />
                <h3>{movie.Title} ({movie.Year})</h3>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;