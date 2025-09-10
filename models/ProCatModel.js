const mongoose = require('mongoose')

const ProCatSchema = new mongoose.Schema({
    comp_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CompanyMaster',
        required: true,
    },
    branch_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BranchModel',
        required: true
    },
    sno: { type: Number, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    info: { type: String }
}, { timestamps: true })


module.exports = mongoose.model('ProCatModel', ProCatSchema)