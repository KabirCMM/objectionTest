const express = require('express');
const UserController = require('../controllers/UserController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();



router.post('/',authenticateToken, UserController.createUser);
router.get('/',authenticateToken, UserController.getUsers);
router.get('/:id',authenticateToken, UserController.getUserById);
router.put('/:id',authenticateToken, UserController.updateUserById);
router.delete('/:id',authenticateToken, UserController.deleteUserById);

module.exports = router;
