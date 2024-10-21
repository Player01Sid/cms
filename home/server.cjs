const express = require('express');
const serve = require('serve-static');
const path = require('path');

const app = express();
const PORT = 80;

// Metrics storage
let requestCount = 0;
let errorCount = 0;

// Middleware to serve static files
app.use(serve(path.join(__dirname, 'dist')));

// Middleware to count requests
app.use((req, res, next) => {
    requestCount++;
    next();
});

// Example route that could fail (for testing)
app.get('/test', (req, res) => {
    // Simulate a random error for demonstration
    if (Math.random() < 0.5) {
        return res.status(400).send('Bad Request'); // Simulate a client error
    }
    res.send('Success');
});

// Middleware for handling errors
app.use((err, req, res, next) => {
    errorCount++;
    res.status(err.status || 500).send(err.message);
});

// Middleware to count errors for failed requests
app.use((req, res, next) => {
    const originalSend = res.send;
    res.send = function (...args) {
        // Check if the status code indicates an error
        if (res.statusCode >= 400) {
            errorCount++;
        }
        return originalSend.apply(this, args);
    };
    next();
});

// Custom metrics endpoint
app.get('/metrics', (req, res) => {
    const uptime = process.uptime(); // Application uptime in seconds

    const metrics = `
# HELP app_uptime The uptime of the application in seconds
# TYPE app_uptime gauge
app_uptime ${uptime}

# HELP app_request_count Total number of requests received
# TYPE app_request_count counter
app_request_count ${requestCount}

# HELP app_error_count Total number of errors encountered
# TYPE app_error_count counter
app_error_count ${errorCount}
    `;

    res.set('Content-Type', 'text/plain; version=0.0.4; charset=utf-8');
    res.send(metrics.trim());
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
