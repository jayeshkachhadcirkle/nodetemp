// models/CompanyMasters.js
const mongoose = require('mongoose');

const companyModelSchema = new mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to User model
        required: true,
    },
    sno: { type: Number, required: true, default: 0 },
    name: { type: String, required: true },
    address: String,
    phone: { type: String, required: true },
    pincode: { type: String, required: true },
    info: { type: String, required: true },

}, { timestamps: true });

module.exports = mongoose.model('CompanyModel', companyModelSchema);
