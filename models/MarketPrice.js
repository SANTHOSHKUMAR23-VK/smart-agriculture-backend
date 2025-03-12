const mongoose = require('mongoose');

const MarketPriceSchema = new mongoose.Schema({
    vegetable: { type: String, required: true },
    pricePerKg: { type: Number, required: true },
    updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('MarketPrice', MarketPriceSchema);
