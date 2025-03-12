const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');

dotenv.config();
const router = express.Router();

// ✅ Get Weather Data & Recommended Crops
router.get('/:location', async (req, res) => {
    try {
        const location = req.params.location;
        const apiKey = process.env.WEATHER_API_KEY;
        
        // Fetch weather data
        const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=${apiKey}`;
        const response = await axios.get(weatherUrl);
        const weatherData = response.data;

        // Extract weather details
        const { temp, humidity } = weatherData.main;
        const description = weatherData.weather[0].description;
        
        // Determine crop recommendations
        const recommendedCrops = getCropRecommendations(temp, humidity);

        res.json({
            location,
            temperature: `${temp}°C`,
            humidity: `${humidity}%`,
            weather: description,
            recommendedCrops
        });
    } catch (error) {
        res.status(500).json({ msg: 'Error fetching weather data' });
    }
});

// Function to recommend crops based on weather
function getCropRecommendations(temp, humidity) {
    if (temp > 30 && humidity > 60) {
        return ["Rice", "Sugarcane", "Banana"];
    } else if (temp > 20 && temp <= 30) {
        return ["Wheat", "Maize", "Barley"];
    } else if (temp <= 20) {
        return ["Potatoes", "Carrots", "Lettuce"];
    } else {
        return ["No suitable crops found"];
    }
}

module.exports = router;
