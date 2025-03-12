const mongoose = require('mongoose');

const SchemeSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        eligibility: {
            type: String,
            required: true
        },
        benefits: {
            type: String,
            required: true
        },
        applyLink: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Scheme', SchemeSchema);
