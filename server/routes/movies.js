const router = require('express').Router();
const auth = require('../middleware/authMiddleware');
const Movie = require('../models/Movie');

router.post('/add', auth, async (req, res) => {
  const { tmdbId, title, poster_path, overview } = req.body;
  
  try {
    const newMovie = new Movie({
      tmdbId,
      title,
      poster_path,
      overview,
      user: req.user.id,
    });
    
    const movie = await newMovie.save();
    res.json(movie);

  } catch (err) {
    console.error(err.message);
    // If the error is a duplicate key error, send a specific message
    if (err.code === 11000) {
      return res.status(400).json({ msg: 'Movie already in your list' });
    }
    res.status(500).send('Server Error');
  }
});

// ... (your other GET and DELETE routes are here) ...

router.get('/', auth, async (req, res) => {
    try {
        const movies = await Movie.find({ user: req.user.id });
        res.json(movies);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/:id', auth, async (req, res) => {
    try {
        let movie = await Movie.findById(req.params.id);
        if (!movie) return res.status(404).json({ msg: 'Movie not found' });
        if (movie.user.toString() !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        await Movie.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Movie removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;