const express = require('express');
const serve = require('serve-static');
const path = require('path');

const app = express();
const PORT = 80;

// Middleware to serve static files
app.use(serve(path.join(__dirname, 'dist')));

// Custom metrics endpoint
app.get('/metrics', (req, res) => {
    // Here you can gather and return your metrics
    const metrics = {
        uptime: process.uptime(),
        // Add more metrics as needed
    };
    res.json(metrics);
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

