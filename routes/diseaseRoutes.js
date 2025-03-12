const express = require('express');
const router = express.Router();

// Sample plant disease data
const diseases = {
    "tomato_late_blight": {
        name: "Tomato Late Blight",
        description: "A fungal disease affecting tomato plants.",
        treatment: "Use fungicides with chlorothalonil. Remove infected leaves."
    },
    "potato_early_blight": {
        name: "Potato Early Blight",
        description: "Causes brown spots on potato leaves.",
        treatment: "Apply copper-based fungicides."
    },
    "rice_blast": {
        name: "Rice Blast",
        description: "Affects rice crops leading to reduced yield.",
        treatment: "Apply tricyclazole-based fungicides."
    }
};

// ✅ Detect plant disease (Mock API)
router.post('/detect', (req, res) => {
    // Since we are not using image upload, we'll just return a random disease
    const diseaseKeys = Object.keys(diseases);
    const randomDisease = diseaseKeys[Math.floor(Math.random() * diseaseKeys.length)];

    res.json({
        disease: diseases[randomDisease].name,
        description: diseases[randomDisease].description,
        treatment: diseases[randomDisease].treatment
    });
});

module.exports = router;
