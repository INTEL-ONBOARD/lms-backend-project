const express = require('express');
const app = express();
const logger = require('./middlewares/infoLogger').logger;
const errorLogger = require('./handlers/errorLogger');
const mongoose = require('mongoose');
const connectDB = require('./config/db');

// Connect to MongoDB
connectDB();

// Set up mongoose connection error handling
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
});

const port = 3000;

const routes = require('./routes/Routes');

app.use(express.json());
app.use(logger);

app.get('/health-check', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is running smoothly'
    });
});
app.use(routes);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.use(errorLogger);

module.exports = app; 