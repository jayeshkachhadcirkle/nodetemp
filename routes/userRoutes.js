// routes/users.js
const express = require('express');
const router = express.Router();
const { createUser, loginUser, getAllUsers, getUserById, updateUserById, deleteUserById, verifyToken } = require('../controllers/usersController');

// Public routes
router.post('/register', createUser);  // Register new user
router.post('/login', loginUser);      // Login user

// Protected routes (Require JWT verification)
// router.get('/', verifyToken, getAllUsers);  // Get all users
router.get('/:id', verifyToken, getUserById); // Get user by ID
router.put('/:id', verifyToken, updateUserById); // Update user
router.delete('/:id', verifyToken, deleteUserById); // Delete user

module.exports = router;
