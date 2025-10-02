const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // To parse JSON bodies

app.use('/api/auth', require('./routes/auth'));
app.use('/api/favorites', require('./routes/movies'));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected successfully.'))
  .catch(err => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
// Add this to server/server.js
const moviesRouter = require('./routes/movies');
app.use('/favorites', moviesRouter);