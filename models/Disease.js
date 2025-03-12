const mongoose = require('mongoose');

const DiseaseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    symptoms: { type: String, required: true },
    remedy: { type: String, required: true },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Disease', DiseaseSchema);
