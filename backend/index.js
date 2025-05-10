import axios from 'axios'
import express from 'express'
import cors from 'cors'


const app = express();

// CORS Allowed Development Endpoints
const allowedOrigins = [
    'http://localhost:5173', // Local development
    // 'https://your-deployed-frontend.com' // Production
];


app.use(
    cors({
        origin: (origin, callback) => {
            if (!origin || allowedOrigins.includes(origin)) {
                callback(null, true);
            } else {
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true, // Enable cookies/authorization headers
    })
);

app.get('/', async (req, res) => {
    console.log("application has started");
    res.send('Application has started'); 
});

app.get('/dashboard', async (req, res) => {
    console.log("User is in dashbaord");
    res.send('User is in dashbaord');
});

app.listen(3000, (req, res) => {
    console.log('Server is running on port 3000');
});
