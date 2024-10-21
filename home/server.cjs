const express = require('express');
const serve = require('serve-static');
const path = require('path');

const app = express();
const PORT = 80;

// Middleware to serve static files
app.use(serve(path.join(__dirname, 'dist')));

// Custom metrics endpoint
app.get('/metrics', (req, res) => {
    const uptime = process.uptime(); // Application uptime in seconds
    const requestCount = 100; // Example request count, replace with actual logic
    const errorCount = 5;      // Example error count, replace with actual logic

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

