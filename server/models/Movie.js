const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  tmdbId: { type: String, required: true },
  title: { type: String, required: true },
  poster_path: { type: String },
  overview: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
}, { 
  timestamps: true,
  // This prevents a user from saving the same movie twice
  indexes: [{ unique: true, fields: ['tmdbId', 'user'] }] 
});

const Movie = mongoose.model('Movie', movieSchema);
module.exports = Movie;