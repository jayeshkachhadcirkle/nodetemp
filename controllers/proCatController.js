const ProCatModel = require('../models/ProCatModel'); // Adjust path if needed
const CompanyMasters = require('../models/CompanyMaster'); // Assuming this is your company model
const BranchModel = require('../models/BranchModel'); // Assuming this is your branch model

// Create a new Product Category
exports.createProCat = async (req, res) => {
    try {
        const { comp_id, branch_id, name, desc, info } = req.body;

        // Check if the company exists
        const company = await CompanyMasters.findById(comp_id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }

        // Check if the branch exists
        const branch = await BranchModel.findById(branch_id);
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }

        // Find the last product category for the company and branch to increment sno
        const lastProCat = await ProCatModel.findOne({ comp_id, branch_id }).sort({ sno: -1 });

        let sno = 1; // Default value for sno if no previous category found
        if (lastProCat) {
            sno = lastProCat.sno + 1; // Increment sno based on the last product category
        }

        // Create a new product category
        const newProCat = new ProCatModel({
            comp_id,
            branch_id,
            sno,
            name,
            desc,
            info
        });

        // Save the new product category
        await newProCat.save();

        res.status(201).json({ message: 'Product category created successfully', newProCat });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get all product categories for a given company and branch
exports.getAllProCats = async (req, res) => {
    try {
        const { comp_id, branch_id } = req.query;

        // Validate company and branch IDs
        if (!comp_id || !branch_id) {
            // return all if not selected
            const allProCats = await ProCatModel.find()
            res.json(allProCats)
        }

        // Fetch product categories for the given company and branch
        const proCats = await ProCatModel.find({ comp_id, branch_id });

        if (proCats.length === 0) {
            return res.status(404).json({ message: 'No product categories found' });
        }

        res.status(200).json(proCats);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get a product category by ID
exports.getProCatById = async (req, res) => {
    try {
        const { id } = req.params;

        // Find product category by its ID
        const proCat = await ProCatModel.findById(id);

        if (!proCat) {
            return res.status(404).json({ message: 'Product category not found' });
        }

        res.status(200).json(proCat);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update a product category by ID
exports.updateProCat = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, desc, info } = req.body;

        // Find product category by ID
        const proCat = await ProCatModel.findById(id);
        if (!proCat) {
            return res.status(404).json({ message: 'Product category not found' });
        }

        // Update product category fields
        proCat.name = name || proCat.name;
        proCat.desc = desc || proCat.desc;
        proCat.info = info || proCat.info;

        // Save updated product category
        await proCat.save();

        res.status(200).json({ message: 'Product category updated successfully', proCat });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete a product category by ID
exports.deleteProCat = async (req, res) => {
    try {
        const { id } = req.params;

        // Find product category by ID
        const proCat = await ProCatModel.findById(id);
        if (!proCat) {
            return res.status(404).json({ message: 'Product category not found' });
        }

        // Delete the product category
        await proCat.remove();

        res.status(200).json({ message: 'Product category deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
