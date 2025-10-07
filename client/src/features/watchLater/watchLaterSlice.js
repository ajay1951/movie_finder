// src/features/watchLater/watchLaterSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
// Assume you have a service file for API calls
import watchLaterService from './watchLaterService';

const initialState = {
    movies: [],
    isLoading: false,
    isError: false,
    message: '',
};

// Async Thunk for fetching movies
export const fetchWatchLaterMovies = createAsyncThunk(
    'watchLater/getAll',
    async (_, thunkAPI) => {
        try {
            // Get the token from the auth state
            const token = thunkAPI.getState().auth.user.token;
            return await watchLaterService.getWatchLater(token);
        } catch (error) {
            const message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
            return thunkAPI.rejectWithValue(message);
        }
    }
);

// Async Thunk for ADDING a movie (you should already have this)
export const addMovieToWatchLater = createAsyncThunk(
    'watchLater/add',
    async (movieData, thunkAPI) => {
        // ... your logic to add a movie ...
    }
);


export const watchLaterSlice = createSlice({
    name: 'watchLater',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchWatchLaterMovies.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchWatchLaterMovies.fulfilled, (state, action) => {
                state.isLoading = false;
                state.movies = action.payload; // Update state with fetched movies
            })
            .addCase(fetchWatchLaterMovies.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            // --- This part is crucial for adding a movie ---
            .addCase(addMovieToWatchLater.fulfilled, (state, action) => {
                // Add the new movie returned from the API to our state array
                state.movies.push(action.payload);
            });
    },
});

export const { reset } = watchLaterSlice.actions;
export default watchLaterSlice.reducer;