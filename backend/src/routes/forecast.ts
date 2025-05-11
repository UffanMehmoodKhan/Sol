import express, { Request, Response } from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const AUTH_TOKEN = process.env.AUTH_TOKEN;

// Middleware
router.use(cors());
router.use(express.json());

router.post("/", async (req: Request, res: Response): Promise<void> => {
  const { city } = req.body;

  if (!city) {
    res.status(400).json({ error: "City name is required" });
    return;
  }

  if (!AUTH_TOKEN) {
    console.error("AUTH_TOKEN is not defined in the environment variables.");
    res.status(500).json({ error: "Internal server error: Missing API key" });
    return;
  }

  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${AUTH_TOKEN}`
    );

    const forecastData = response.data;

    // Extract one entry per day at 12:00:00
    const dailyForecast = forecastData.list.filter(
      (entry: { dt_txt: string }) => entry.dt_txt.includes("12:00:00")
    );

    res.json({
      city: forecastData.city.name,
      country: forecastData.city.country,
      forecast: dailyForecast,
    });
  } catch (error: any) {
    console.error("Error fetching forecast data:", error.message);
    res.status(500).json({
      error: "Failed to fetch 5-day forecast",
      details: error.response?.data || error.message,
    });
  }
});

export default router;
