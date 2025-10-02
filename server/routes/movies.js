// server/routes/movies.js
const router = require('express').Router();
const auth = require('../middleware/authMiddleware'); // Import the auth middleware
let Movie = require('../models/Movie');

// GET all favorite movies FOR THE LOGGED-IN USER
// The 'auth' middleware will run before the route handler
router.get('/', auth, async (req, res) => {
  try {
    // Find movies where the 'user' field matches the logged-in user's ID
    const movies = await Movie.find({ user: req.user.id });
    res.json(movies);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// ADD a new favorite movie
router.post('/add', auth, async (req, res) => {
  const { tmdbId, title, poster_path, overview } = req.body;
  try {
    const newMovie = new Movie({
      tmdbId,
      title,
      poster_path,
      overview,
      user: req.user.id, // Associate the movie with the logged-in user
    });
    const movie = await newMovie.save();
    res.json(movie);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// DELETE a favorite movie
router.delete('/:id', auth, async (req, res) => {
    try {
        let movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ msg: 'Movie not found' });

        // Make sure the user owns this movie
        if (movie.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await Movie.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Movie removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;