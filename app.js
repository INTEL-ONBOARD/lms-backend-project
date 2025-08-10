const express = require('express');
const app = express();
const cors = require("cors");
const logger = require('./middlewares/infoLogger').logger;
const errorLogger = require('./handlers/errorLogger');
const mongoose = require('mongoose');
const connectDB = require('./config/db');
const routes = require('./routes/Routes');

// Connect to MongoDB
connectDB();

app.use(cors());
app.use(express.json());
app.use(logger);


app.use(routes);

// Set up mongoose connection error handling
mongoose.connection.on('error', (err) => {
    console.error('MongoDB connection error:', err.message);
});

const port = 3000;


app.get('/health-check', (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Server is running smoothly'
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.use(errorLogger);

module.exports = app; 