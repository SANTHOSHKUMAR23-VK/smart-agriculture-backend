const express = require('express');
const upload = require('../middleware/uploadMiddleware');
const router = express.Router();

// @route  POST /api/upload
// @desc   Upload an image
// @access Public
router.post('/', upload.single('image'), (req, res) => {
    if (!req.file) {
        return res.status(400).json({ msg: 'No file uploaded' });
    }
    res.json({ imagePath: `/uploads/${req.file.filename}` });
});

module.exports = router;
