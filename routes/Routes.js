const routes = require('express').Router();
const UserRoutes = require('./UserRoutes');
const ConfigRoutes = require('./configRoutes');


routes.use('/api/users', UserRoutes);
routes.use('/api/configs', ConfigRoutes);

module.exports = routes;