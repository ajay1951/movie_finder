// src/components/MovieList.js
import './MovieList.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const MovieList = () => {
  // State for the list of movies
  const [movies, setMovies] = useState([]);
  // State for the user's search query
  const [searchTerm, setSearchTerm] = useState('');
  // State for displaying an error message
  const [error, setError] = useState(null);

  // IMPORTANT: Replace with your actual OMDb API key
  const API_KEY = 'e77ec6f9';

  // Function to fetch movies from OMDb API
  const fetchMovies = async (query) => {
    setError(null); // Reset error on new search
    try {
      // 's=' is the parameter for searching for a movie title in OMDb
      const response = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);

      // OMDb returns a 'Response' property of "True" if movies are found
      if (response.data.Response === "True") {
        setMovies(response.data.Search); // The movie list is in the 'Search' property
      } else {
        // Handle cases where no movies are found
        setMovies([]);
        setError(response.data.Error); // OMDb provides a specific error message
      }
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('An error occurred while fetching data.');
    }
  };

  // useEffect to perform an initial search when the component loads
  useEffect(() => {
    fetchMovies('avengers'); // Perform a default search
  }, []); // The empty array [] means this effect runs only once on mount

  // Handler for the form submission
  const handleSearch = (e) => {
    e.preventDefault(); // Prevent the form from refreshing the page
    if (searchTerm) {
      fetchMovies(searchTerm);
    }
  };

  return (
    <div>
      <h1>Movie Search</h1>
      {/* Search Form */}
      <form onSubmit={handleSearch} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>

      {/* Conditional Rendering: Show error or movie grid */}
      {error ? (
        <div className="error-message">{error}</div>
      ) : (
        <div className="movie-grid">
          {/* OMDb uses 'imdbID' for the unique key, 'Poster' for the image, and 'Title' for the title */}
          {movies.map(movie => (
            <div key={movie.imdbID} className="movie-card">
              <img
                src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/500x750.png?text=No+Image'}
                alt={movie.Title}
              />
              <h3>{movie.Title} ({movie.Year})</h3>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MovieList;