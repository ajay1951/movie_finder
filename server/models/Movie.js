// server/models/Movie.js
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  // ... (tmdbId, title, poster_path, overview are the same)
  user: {
    type: mongoose.Schema.Types.ObjectId, // This will be the user's unique ID
    ref: 'User', // This links to the User model
    required: true,
  },
}, { timestamps: true });

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;