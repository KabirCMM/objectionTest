const User = require('../database/models/User');

async function createUser(req, res) {
  try {
    const newUser = await User.query().insert(req.body);
    res.json(newUser);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while creating the user.' });
  }
}

async function getUsers(req, res) {
  try {
    const users = await User.query();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching users.' });
  }
}

async function getUserById(req, res) {
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
      res.json({ message: 'User deleted successfully.' });
    } else {
      res.status(404).json({ error: 'User not found.' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while deleting the user.' });
  }
}

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
  deleteUserById,
};
