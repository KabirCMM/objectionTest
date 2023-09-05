const express = require('express');
const Ajv = require('ajv');
const UserController = require('../controllers/UserController');

const router = express.Router();
const ajv = new Ajv();


const userSchema = {
  type: 'object',
  properties: {
    username: { type: 'string', minLength: 3 },
    email: { type: 'string', format: 'email' },
  },
  required: ['username', 'email'],
};

function validateUserData(req, res, next) {
  const isValid = ajv.validate(userSchema, req.body);

  if (!isValid) {
    return res.status(400).json({ error: 'Invalid data format.', errors: ajv.errors });
  }

  next();
}
router.post('/',validateUserData, UserController.createUser);
router.get('/',validateUserData, UserController.getUsers);
router.get('/:id',validateUserData, UserController.getUserById);
router.put('/:id',validateUserData, UserController.updateUserById);
router.delete('/:id',validateUserData, UserController.deleteUserById);

module.exports = router;
