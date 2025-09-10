// routes/configsRoutes.js
const express = require('express');
const router = express.Router();
const {
    createConfig,
    getAllConfigs,
    getConfigById,
    updateConfig,
    deleteConfig
} = require('../controllers/configsController');
// CRUD Routes
router.post('/', createConfig); // Create a config
router.get('/', getAllConfigs); // Get all configs
router.get('/:id', getConfigById); // Get a config by ID
router.put('/:id', updateConfig); // Update a config by ID
router.delete('/:id', deleteConfig); // Delete a config by ID

module.exports = router;