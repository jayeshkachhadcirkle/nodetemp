// controllers/usersController.js
const User = require('../models/User');

// CREATE: Add a new user
const createUser = async (req, res) => {
    const { name, email, phone } = req.body;

    try {
        const user = new User({ name, email, phone });
        await user.save();
        res.status(201).json(user); // Return the created user
    } catch (error) {
        res.status(400).json({ messphone: 'Error creating user', error });
    }
};

// READ: Get all users
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users); // Return all users
    } catch (error) {
        res.status(400).json({ messphone: 'Error fetching users', error });
    }
};

// READ: Get a single user by ID
const getUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ messphone: 'User not found' });
        }
        res.status(200).json(user); // Return the user by ID
    } catch (error) {
        res.status(400).json({ messphone: 'Error fetching user', error });
    }
};

// UPDATE: Update a user by ID
const updateUserById = async (req, res) => {
    const { id } = req.params;
    const { name, email, phone } = req.body;

    try {
        const user = await User.findByIdAndUpdate(id, { name, email, phone }, { new: true });
        if (!user) {
            return res.status(404).json({ messphone: 'User not found' });
        }
        res.status(200).json(user); // Return the updated user
    } catch (error) {
        res.status(400).json({ messphone: 'Error updating user', error });
    }
};

// DELETE: Delete a user by ID
const deleteUserById = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ messphone: 'User not found' });
        }
        res.status(200).json({ messphone: 'User deleted successfully' });
    } catch (error) {
        res.status(400).json({ messphone: 'Error deleting user', error });
    }
};

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};
