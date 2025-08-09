const routes = require('express').Router();
const UserRoutes = require('./UserRoutes');


routes.use('/api/users', UserRoutes);

module.exports = routes;