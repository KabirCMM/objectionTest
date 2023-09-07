const User = require('../database/models/User');
const cache = require('memory-cache');

async function createUser(req, res) {
  try {
    const newUser = await User.query().insert(req.body);
    clearUserCache();
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
}

async function getUsers(req, res) {
  try {
    const cacheKey = 'allUsers';

    const cachedUsers = cache.get(cacheKey);

    if (cachedUsers) {
      return res.json(cachedUsers);
    }

    const users = await User.query();
    cache.put(cacheKey, users, 60 * 60 * 1000); //cached for 1 hour
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
}

async function getUserById(req, res) {
  const userId = req.params.id;
  try {
    const cacheKey = `user_${userId}`;

    const cachedUser = cache.get(cacheKey);

    if (cachedUser) {
      return res.json(cachedUser);
    }

    const user = await User.query().findById(userId);

    if (!user) {
      return res.status(404).json({ error: 'User not found.' });
    }

    cache.put(cacheKey, user, 60 * 60 * 1000);
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching the user.' });
  }
}

async function updateUserById(req, res) {
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
}

async function deleteUserById(req, res) {
  const userId = req.params.id;
  try {
    const deletedCount = await User.query().deleteById(userId);
    if (deletedCount === 1) {
      clearUserCache(); 
      res.json({ message: 'User deleted successfully.' });
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the user.' });
  }
}

function clearUserCache() {
  cache.del('allUsers');
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
