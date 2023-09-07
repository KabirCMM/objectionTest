const express = require('express');
const UserController = require('../controllers/UserController');
const { authenticateUser } = require('../middleware/authMiddleware');

const router = express.Router();



router.post('/',authenticateUser, UserController.createUser);
router.get('/',authenticateUser, UserController.getUsers);
router.get('/:id',authenticateUser, UserController.getUserById);
router.put('/:id',authenticateUser, UserController.updateUserById);
router.delete('/:id',authenticateUser, UserController.deleteUserById);

module.exports = router;
