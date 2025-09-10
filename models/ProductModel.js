const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema({
    pro_catid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ProCatModel', // Refers to Product Category Model
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
    base_price: {
        type: Number,
        required: true
    },
    base_price2: {
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

module.exports = mongoose.model('ProductModel', ProductSchema);
