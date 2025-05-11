import express, { Request, Response, Router } from 'express';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const router: Router = express.Router();
const AUTH_TOKEN = process.env.AUTH_TOKEN;

// Middleware
router.use(cors());
router.use(express.json());

// Route to fetch weather data
router.post('/', async (req: Request, res: Response): Promise<void> => {
    const { city } = req.body;

    if (!city) {
        res.status(400).json({ error: "City name is required" });
        return;
    }

    try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${AUTH_TOKEN}`);
        let lat = response.data.coord.lat;
        let long = response.data.coord.lon;

        const pollutionResponse = await axios.get(`https://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${long}&appid=${AUTH_TOKEN}`);
        console.log(pollutionResponse.data);

        res.json(pollutionResponse.data);
    } catch (error) {
        const err = error as any; // Cast error to any to access its properties
        console.error("Error fetching weather data:", err.message);
        res.status(500).json({ error: "Failed to fetch weather data" });
    }
});

export default router;