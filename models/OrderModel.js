const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    comp_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyMaster', // Reference to Company Master model
        required: true
    },
    ord_no: {
        type: Number,
        required: true,
        unique: true // Ensures unique order number
    },
    name: {
        type: String,
        required: true
    },
    ref_no: {
        type: Number,
        required: true
    },
    status: {
        type: Number,
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    delivere: {
        type: Number,
        required: true
    },
    remark: {
        type: String
    },
    info: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('OrderModel', OrderSchema);
