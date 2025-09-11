// controllers/ConfigsController.js

const Config = require('../models/ConfigModel');
const CompanyMaster = require('../models/CompanyModel');

// Create Config
exports.createConfig = async (req, res) => {
    try {
        const { comp_id, mode, ref, info } = req.body;
        // Check if company exists
        const company = await CompanyMaster.findById(comp_id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        const config = new Config({ comp_id, mode, ref, info });
        await config.save();
        res.status(201).json(config);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all Configs
exports.getAllConfigs = async (req, res) => {
    try {
        const configs = await Config.find().populate('comp_id', 'name');
        res.json(configs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get single Config by ID
exports.getConfigById = async (req, res) => {
    try {
        const config = await Config.findById(req.params.id).populate('comp_id', 'name');
        if (!config) {
            return res.status(404).json({ message: 'Config not found' });
        }
        res.json(config);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update Config
exports.updateConfig = async (req, res) => {
    try {
        const { comp_id, mode, ref, info } = req.body;
        const config = await Config.findByIdAndUpdate(
            req.params.id,
            { comp_id, mode, ref, info },
            { new: true }
        );
        if (!config) {
            return res.status(404).json({ message: 'Config not found' });
        }
        res.json(config);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete Config
exports.deleteConfig = async (req, res) => {
    try {
        const config = await Config.findByIdAndDelete(req.params.id);
        if (!config) {
            return res.status(404).json({ message: 'Config not found' });
        }
        res.json({ message: 'Config deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

