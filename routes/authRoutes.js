
const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../database/models/User');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.query().insert({ username, email, password: hashedPassword });
    const token = newUser.generateToken();

    res.cookie('token', token, { httpOnly: true });
    res.json({ user: newUser, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during signup.' });
  }
});

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.query().findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = user.generateToken();
    res.cookie('token', token, { httpOnly: true });
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred during login.' });
  }
});


router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logout successful' });
});

router.get('/profile', authenticateToken, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
