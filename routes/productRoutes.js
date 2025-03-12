const express = require('express');
const Product = require('../models/product');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

// ✅ Create a Product (Protected)
router.post('/', authMiddleware, async (req, res) => {
    try {
        const { name, description, price, quantity, category, image } = req.body;

        if (!name || !description || !price || !quantity || !category) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        const product = new Product({
            user: req.user._id,
            name,
            description,
            price,
            quantity,
            category,
            image
        });

        const savedProduct = await product.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// ✅ Get All Products (Public)
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// ✅ Get a Single Product by ID (Public)
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// ✅ Update a Product (Protected)
router.put('/:id', authMiddleware, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        if (product.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        const { name, description, price, quantity, category, image } = req.body;
        product.name = name || product.name;
        product.description = description || product.description;
        product.price = price || product.price;
        product.quantity = quantity || product.quantity;
        product.category = category || product.category;
        product.image = image || product.image;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// ✅ Delete a Product (Protected)
router.delete('/:id', authMiddleware, async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            return res.status(404).json({ msg: 'Product not found' });
        }

        if (product.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await product.deleteOne();
        res.json({ msg: 'Product deleted' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
