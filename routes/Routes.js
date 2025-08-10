const routes = require('express').Router();
const UserRoutes = require('./UserRoutes');
const ConfigRoutes = require('./configRoutes');
const OrderRoutes = require('./orderRoutes');

routes.use('/api/users', UserRoutes);
routes.use('/api/configs', ConfigRoutes);
routes.use('/api/orders', OrderRoutes);

module.exports = routes;