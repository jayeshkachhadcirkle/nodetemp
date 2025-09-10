const mongoose = require('mongoose');

const OrderInfoSchema = new mongoose.Schema({
    ord_no: {
        type: mongoose.Schema.Types.Number,
        ref: 'OrderModel', // Reference to the main Order Model
        required: true
    },
    sno: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    var_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'VariantModel', // Reference to the Variant Model
        required: true
    },
    qty: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    value: {
        type: Number,
        required: true
    },
    info: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('OrderInfoModel', OrderInfoSchema);
