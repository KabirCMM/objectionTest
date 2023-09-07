
const express = require('express');
const {handleUserSignup, loginHandler, logoutHandler} = require('../controllers/UserLogin')
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/signup', handleUserSignup);

router.post('/login', loginHandler);

router.post('/logout', logoutHandler);

router.get('/profile', authenticateUser, (req, res) => {
  res.json({ user: req.user });
});

module.exports = router;
