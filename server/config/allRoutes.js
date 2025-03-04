const routes = require('express').Router()


routes.use('/admin/team', require('../controllers/TeamController'));
routes.use('/admin/property', require('../controllers/PropertyController'));

module.exports = routes;