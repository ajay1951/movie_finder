// server/routes/tmdb.js
const router = require('express').Router();
const axios = require('axios');
require('dotenv').config();

const API_KEY = process.env.TMDB_API_KEY; // Make sure to add this to your .env file
const BASE_URL = 'https://api.themoviedb.org/3';

// Fetch details for a single movie
// GET /api/tmdb/movie/:id
router.get('/movie/:id', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${req.params.id}?api_key=${API_KEY}&language=en-US`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching movie details' });
  }
});

// Fetch credits (cast and crew) for a movie
// GET /api/tmdb/movie/:id/credits
router.get('/movie/:id/credits', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${req.params.id}/credits?api_key=${API_KEY}&language=en-US`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching movie credits' });
  }
});

// Fetch watch providers for a movie
// GET /api/tmdb/movie/:id/providers
router.get('/movie/:id/providers', async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/movie/${req.params.id}/watch/providers?api_key=${API_KEY}`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ msg: 'Error fetching watch providers' });
  }
});

module.exports = router;