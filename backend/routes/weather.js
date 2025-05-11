const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const router = express.Router();
const AUTH_TOKEN = process.env.AUTH_TOKEN;

// Middleware
router.use(cors());
router.use(express.json());

// Route to fetch weather data
router.post('/', async (req, res) => {
    const { city } = req.body;

    if (!city) {
        return res.status(400).json({ error: "City name is required" });
    }

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${AUTH_TOKEN}`);
        res.json(response.data);
    } catch (error) {
        console.error("Error fetching weather data:", error.message);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

module.exports = router;