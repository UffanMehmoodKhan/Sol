import express from 'express';

const router = express.Router();

// Define your routes here
router.get('/example', (req, res) => {
    res.send('Example route');
});

// Export the router
export { router };