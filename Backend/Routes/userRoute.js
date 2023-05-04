const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Register a new user
router.post('/register', userController.register);

// Login user
router.post('/login', userController.login);
// Logout user
router.get('/logout', userController.logout);

// Get all users
router.get('/', userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Delete user
router.delete('/:id', userController.deleteUser);

module.exports = router;
