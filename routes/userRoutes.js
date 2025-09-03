// routes/userRoutes.js
const express = require('express');
const router = express.Router();
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
} = require('../controllers/usersController');

// CRUD Routes
router.post('/', createUser); // Create a user
router.get('/', getAllUsers); // Get all users
router.get('/:id', getUserById); // Get a user by ID
router.put('/:id', updateUserById); // Update a user by ID
router.delete('/:id', deleteUserById); // Delete a user by ID

module.exports = router;
