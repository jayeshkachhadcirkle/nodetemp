// models/BranchModel.js
const mongoose = require('mongoose');

const branchSchema = new mongoose.Schema({
    comp_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyMaster', // Reference to User model
        required: true,
    },
    sno: { type: Number, required: true },
    name: { type: String, required: true },
    address: String,
    phone: { type: String, required: true },
    pincode: { type: String, required: true },
    info: { type: String },

}, { timestamps: true });

module.exports = mongoose.model('BranchModel', branchSchema);
