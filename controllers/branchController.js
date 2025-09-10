// controllers/BranchModelController.jsuser
const BranchModel = require('../models/BranchModel');
const Company = require('../models/CompanyMaster');



exports.createBranch = async (req, res) => {
    try {
        const { comp_id, name, address, phone, pincode, info } = req.body;

        const comp = await Company.findById(comp_id);
        if (!comp) {
            return res.status(404).json({ message: 'Company not found' });
        }

        const lastBranch = await BranchModel.findOne({ comp_id }).sort({ sno: -1 });

        let sno = 1; // Default value for sno
        if (lastBranch) {
            sno = lastBranch.sno + 1;
        }

        const branch = new BranchModel({ comp_id, sno, name, address, phone, pincode, info });
        await branch.save();

        res.status(201).json(branch);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


exports.getAllBranches = async (req, res) => {
    try {
        const branches = await BranchModel.find().populate('comp_id', 'name, sno');
        res.json(branches);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.getBranchById = async (req, res) => {
    try {
        const branch = await BranchModel.findById(req.params.id).populate('comp_id', 'name sno');
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        res.json(branch);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.updateBranch = async (req, res) => {
    try {
        const { comp_id, sno, name, address, phone, pincode, info } = req.body;
        const branch = await BranchModel.findByIdAndUpdate(
            req.params.id,
            { comp_id, sno, name, address, phone, pincode, info },
            { new: true }
        );
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        res.json(branch);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

exports.deleteBranch = async (req, res) => {
    try {
        const branch = await BranchModel.findByIdAndDelete(req.params.id);
        if (!branch) {
            return res.status(404).json({ message: 'Branch not found' });
        }
        res.json({ message: 'Branch deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
