// server/routes/auth.js
const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// --- REGISTER A NEW USER ---
// @route POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    // Check if user already exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Create new user from request body
    user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(req.body.password, salt);

    // Save the user to the database
    await user.save();

    res.status(201).send('User registered successfully');

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// --- LOGIN A USER ---
// @route POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    // Check for user by email
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Compare submitted password with the hashed password in the DB
    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    // Create a JWT payload
    const payload = {
      user: {
        id: user.id, // The user's MongoDB unique _id
      },
    };

    // Sign the token
    jwt.sign(
      payload,
      process.env.JWT_SECRET, // A secret key
      { expiresIn: '5h' }, // Token expires in 5 hours
      (err, token) => {
        if (err) throw err;
        res.json({ token }); // Send the token back to the client
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;