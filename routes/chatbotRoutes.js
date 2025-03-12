const express = require('express');
const router = express.Router();

// Sample chatbot responses
const responses = {
    "hello": "Hello! How can I assist you with your farming needs today?",
    "hi": "Hi there! How can I help you?",
    "weather": "You can check the latest weather forecasts in the Weather section.",
    "disease": "Our Disease Detection tool can help identify plant diseases from images.",
    "market": "Check out our Marketplace section to buy or sell agricultural products.",
    "schemes": "You can find information about government schemes in the Schemes section.",
    "help": "I can assist you with weather forecasts, crop recommendations, disease detection, and market prices. How can I help?"
};

// ✅ Handle Chatbot Queries
router.post('/', (req, res) => {
    const { message } = req.body;
    if (!message) {
        return res.status(400).json({ msg: "Please provide a message." });
    }

    const lowerMessage = message.toLowerCase();
    let reply = "I'm sorry, I didn't understand that. Please ask about farming, crops, or weather.";

    for (const key in responses) {
        if (lowerMessage.includes(key)) {
            reply = responses[key];
            break;
        }
    }

    res.json({ reply });
});

module.exports = router;
