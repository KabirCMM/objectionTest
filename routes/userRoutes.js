const express = require('express');
const Ajv = require('ajv');
const User = require('../database/models/User');

const router = express.Router();
const ajv = new Ajv();

// JSON Schema
const userSchema = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 3 },
    email: { type: 'string', format: 'email' },
  },
  required: ['username', 'email'],
};

// Middleware
function validateUserData(req, res, next) {
  const isValid = ajv.validate(userSchema, req.body);

  if (!isValid) {
    return res.status(400).json({ error: 'Invalid data format.', errors: ajv.errors });
  }

  next();
}

// Creating a new user
router.post('/', validateUserData, async (req, res) => {
  try {
    const newUser = await User.query().insert(req.body);
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
});

// Get all users
router.get('/', validateUserData, async (req, res) => {
  try {
    const users = await User.query();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
});

// Get user by ID
router.get('/:id', validateUserData, async (req, res) => {
  const userId = req.params.id;
  try {
    const user = await User.query().findById(userId);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
});

// Update user by ID
router.put('/:id', validateUserData, async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await User.query().patchAndFetchById(userId, req.body);
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while updating the user.' });
  }
});

// Delete user by ID
router.delete('/:id', validateUserData, async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedCount = await User.query().deleteById(userId);
    if (deletedCount === 1) {
      res.json({ message: 'User deleted successfully.' });
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the user.' });
  }
});

module.exports = router;
