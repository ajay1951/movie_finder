// src/components/watchLater.js

import React, { useEffect } from 'react';
// Import useDispatch to send actions, and useSelector to read from the store
import { useSelector, useDispatch } from 'react-redux';
import MovieCard from './MovieCard';
// You will need to import the async thunk you use to fetch movies
// Let's assume it's named `fetchWatchLaterMovies` and is in your watchLaterSlice
import { fetchWatchLaterMovies } from '../features/watchLater/watchLaterSlice';

const WatchLater = () => {
    // useDispatch is the function you use to send (dispatch) actions to Redux
    const dispatch = useDispatch();

    // useSelector reads data from the Redux store.
    // We get the user for authentication purposes.
    const { user } = useSelector((state) => state.auth);

    // --- KEY CHANGE ---
    // Instead of useState, we get the movie list, loading status, and error
    // directly from the watchLater slice in our Redux store.
    const { movies, isLoading, isError, message } = useSelector(
        (state) => state.watchLater
    );

    useEffect(() => {
        // When the component loads, we dispatch the async thunk
        // This thunk will handle the API call and update the Redux store.
        if (user) {
            dispatch(fetchWatchLaterMovies());
        }
        // We add `user` and `dispatch` to the dependency array.
    }, [user, dispatch]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (isError) {
        return <div>Error: {message}</div>;
    }

    return (
        <div className='watch-later-container'>
            <h2>My Watch List</h2>
            {movies && movies.length > 0 ? (
                <div className='movie-grid'>
                    {/* We now map over `movies` from the Redux store */}
                    {movies.map((movie) => (
                        <MovieCard key={movie._id} movie={movie} />
                    ))}
                </div>
            ) : (
                <h3>Your watch list is empty.</h3>
            )}
        </div>
    );
};

export default WatchLater;