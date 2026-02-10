const express = require('express');
const userController = require('../controller/userController');
const { verifyToken } = require('../middleware/auth');

const router = express.Router();

// All user routes are protected with authentication
router.use(verifyToken);

// Route to create a new user
router.post('/users', userController.createUser);

// Route to get all users
router.get('/users', userController.getAllUsers);

// Route to get a user by ID
router.get('/users/:id', userController.getUserById);

module.exports = router;
