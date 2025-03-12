const express = require('express');
const Scheme = require('../models/Scheme');

const router = express.Router();

// ✅ Get All Schemes (Public)
router.get('/', async (req, res) => {
    try {
        const schemes = await Scheme.find();
        res.json(schemes);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// ✅ Get a Single Scheme by ID (Public)
router.get('/:id', async (req, res) => {
    try {
        const scheme = await Scheme.findById(req.params.id);
        if (!scheme) {
            return res.status(404).json({ msg: 'Scheme not found' });
        }
        res.json(scheme);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// ✅ Admin: Add a New Scheme (Protected)
router.post('/', async (req, res) => {
    try {
        const { name, description, eligibility, benefits, applyLink } = req.body;

        if (!name || !description || !eligibility || !benefits || !applyLink) {
            return res.status(400).json({ msg: 'All fields are required' });
        }

        const newScheme = new Scheme({ name, description, eligibility, benefits, applyLink });
        const savedScheme = await newScheme.save();
        res.status(201).json(savedScheme);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// ✅ Admin: Update a Scheme (Protected)
router.put('/:id', async (req, res) => {
    try {
        const scheme = await Scheme.findById(req.params.id);
        if (!scheme) {
            return res.status(404).json({ msg: 'Scheme not found' });
        }

        const { name, description, eligibility, benefits, applyLink } = req.body;
        scheme.name = name || scheme.name;
        scheme.description = description || scheme.description;
        scheme.eligibility = eligibility || scheme.eligibility;
        scheme.benefits = benefits || scheme.benefits;
        scheme.applyLink = applyLink || scheme.applyLink;

        const updatedScheme = await scheme.save();
        res.json(updatedScheme);
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

// ✅ Admin: Delete a Scheme (Protected)
router.delete('/:id', async (req, res) => {
    try {
        const scheme = await Scheme.findById(req.params.id);
        if (!scheme) {
            return res.status(404).json({ msg: 'Scheme not found' });
        }

        await scheme.deleteOne();
        res.json({ msg: 'Scheme deleted' });
    } catch (error) {
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
