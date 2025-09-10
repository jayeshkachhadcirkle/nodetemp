const mongoose = require('mongoose');

const VariantSchema = new mongoose.Schema({
    product_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProductModel', // Reference to the Product Model
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
    var_price: {
        type: Number,
        required: true
    },
    var_price2: {
        type: Number
    },
    desc: {
        type: String,
        required: true
    },
    info: {
        type: String
    }
}, { timestamps: true });

module.exports = mongoose.model('VariantModel', VariantSchema);
