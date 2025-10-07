// src/components/MovieCard.js
import React from 'react';
import axios from 'axios';

const MovieCard = ({ movie }) => {
    const handleAddFavorite = async () => {
        try {
            // NOTE: We now use movie.imdbID as the unique identifier
            await axios.post('/api/favorites', { movieId: movie.imdbID }, {
                headers: {
                    token: "dca5264c74466b190f158d0bed0b5dcb" // Replace with actual token
                }
            });
            alert(`${movie.Title} added to favorites!`);
        } catch (err) {
            console.log(err);
            alert('Failed to add to favorites.');
        }
    };

    // OMDb might return 'N/A' for posters. Provide a fallback.
    const poster = movie.Poster === 'N/A' ? 'https://via.placeholder.com/200x300.png?text=No+Image' : movie.Poster;

    return (
        <div style={{ margin: '10px', border: '1px solid #ccc', padding: '10px', width: '200px' }}>
            <img src={poster} alt={movie.Title} style={{ width: '100%' }} />
            <h3 style={{ height: '50px', overflow: 'hidden' }}>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <button onClick={handleAddFavorite}>Add to Watch Later</button>
        </div>
    );
};

export default MovieCard;