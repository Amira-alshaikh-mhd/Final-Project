const express = require('express');
const router = express.Router();
const userController = require('../Controllers/userController');

// Register a new user
router.post('/register', userController.register);

// Login user
router.post('/login', userController.login);

// create Admin
router.post('/Admin', userController.createAdmin);



// Logout user
router.get('/logout', userController.logout);

// Get all userss
router.get('/', userController.getAllUsers);

// Get user by ID
router.get('/:id', userController.getUserById);

// Delete user
router.delete('/:id', userController.deleteUser);

module.exports = router;
