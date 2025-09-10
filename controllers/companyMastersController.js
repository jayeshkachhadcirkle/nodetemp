// controllers/companyMastersController.jsuser
const CompanyMasters = require('../models/CompanyMaster');
const User = require('../models/User');

// Create Company

// exports.createCompany = async (req, res) => {
//     try {
//         const { user_id, sno, name, address, phone, pincode, info } = req.body;

//         // Check if user exists
//         const user = await User.findById(user_id);
//         if (!user) {
//             return res.status(404).json({ message: 'User not found' });
//         }

//         const company = new CompanyMasters({ user_id, sno, name, address, phone, pincode, info });
//         await company.save();

//         res.status(201).json(company);
//     } catch (error) {
//         res.status(500).json({ message: 'Server error', error });
//     }
// };

exports.createCompany = async (req, res) => {
    try {
        const { user_id, name, address, phone, pincode, info } = req.body;

        // Check if user exists
        const user = await User.findById(user_id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Find the last company for the user, sorted by 'sno' in descending order to get the latest one
        const lastCompany = await CompanyMasters.findOne({ user_id }).sort({ sno: -1 });

        let sno = 1; // Default value for sno
        if (lastCompany) {
            // If a company exists, increment the sno of the last company
            sno = lastCompany.sno + 1;
        }

        // Create and save the new company with the updated sno
        const company = new CompanyMasters({ user_id, sno, name, address, phone, pincode, info });
        await company.save();

        res.status(201).json(company);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};


// Get all Companies (with user details populated)
exports.getAllCompanies = async (req, res) => {
    try {
        const companies = await CompanyMasters.find().populate('user_id', 'name email');
        res.json(companies);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Get single Company by ID
exports.getCompanyById = async (req, res) => {
    try {
        const company = await CompanyMasters.findById(req.params.id).populate('user_id', 'name email');
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.json(company);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Update Company
exports.updateCompany = async (req, res) => {
    try {
        const { user_id, sno, name, address, phone, pincode, info } = req.body;
        const company = await CompanyMasters.findByIdAndUpdate(
            req.params.id,
            { user_id, sno, name, address, phone, pincode, info },
            { new: true }
        );
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.json(company);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};

// Delete Company
exports.deleteCompany = async (req, res) => {
    try {
        const company = await CompanyMasters.findByIdAndDelete(req.params.id);
        if (!company) {
            return res.status(404).json({ message: 'Company not found' });
        }
        res.json({ message: 'Company deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};
