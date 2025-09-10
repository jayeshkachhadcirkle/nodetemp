// Config Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const configSchema = new Schema({
    comp_id: { type: Schema.Types.ObjectId, ref: 'CompanyMaster', required: true, unique: true },
    mode: { type: Number, required: true },
    ref: { type: String, required: true, default: 'ref' },
    info: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('ConfigModel', configSchema);

