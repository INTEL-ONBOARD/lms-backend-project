const express = require('express');
const app = express();
const logger = require('./middlewares/infoLogger').logger;
const errorLogger = require('./handlers/errorLogger');
const port = 3000;


app.use(express.json());
app.use(logger);

app.get('/health-check', (req, res) => {
    res.send('Server is running!');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

app.use(errorLogger);

module.exports = app; 