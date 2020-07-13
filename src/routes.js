const { Router } = require('express');

const routes = new Router();

const boletoController = require('./app/controllers/boletoController');

routes.post('/validaboleto', boletoController.validateBoleto);

module.exports = routes;
