const mongoose = require('mongoose');

const CropSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, required: true },
    pricePerKg: { type: Number, required: true },
    farmer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Crop', CropSchema);
