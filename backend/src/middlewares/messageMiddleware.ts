import axios from 'axios';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

dotenv.config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

export const sendLoginMessage = async (req: Request, res: Response, phone_no: string) => {
    try {
        const city = "Lahore";

        if (!city) {
            console.error('City is required to fetch data.');
            return;
        }

        const AUTH_TOKEN = process.env.AUTH_TOKEN;

        // Fetch weather data
        const weatherResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${AUTH_TOKEN}`
        );
        const weatherData = weatherResponse.data;

        // Fetch pollution data
        const pollutionResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/air_pollution?lat=${weatherData.coord.lat}&lon=${weatherData.coord.lon}&appid=${AUTH_TOKEN}`
        );
        const pollutionData = pollutionResponse.data;

        // Fetch forecast data
        const forecastResponse = await axios.get(
            `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${AUTH_TOKEN}`
        );
        const forecastData = forecastResponse.data.list
            .filter((entry: { dt_txt: string }) => entry.dt_txt.includes('12:00:00'))
            .map((entry: any) => `${entry.dt_txt}: ${entry.weather[0].description}`)
            .join('\n');

        // Construct the message
        const messageBody = `
      Weather Update for ${city}:
      - Temperature: ${weatherData.main.temp}°K
      - Condition: ${weatherData.weather[0].description}
      - Air Quality Index: ${pollutionData.list[0].main.aqi}
      \n- 5-Day Forecast:
      ${forecastData}
    `;

        // Send the message via Twilio
        const message = await client.messages.create({
            from: 'whatsapp:+14155238886', // Twilio WhatsApp number
            to: `whatsapp:${phone_no}`,
            body: messageBody,
        });

        console.log('Message sent successfully:', message.sid);
    } catch (error) {
        console.error('Error sending message:', error);
    }
};