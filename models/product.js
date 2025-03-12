const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        price: {
            type: Number,
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        category: {
            type: String,
            required: true
        },
        image: {
            type: String,
            default: 'https://via.placeholder.com/150'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Product', ProductSchema);
