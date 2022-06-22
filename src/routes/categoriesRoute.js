const express = require('express');
const categoriesController = require('../controllers/categoriesController');

const routes = express.Router();

routes.post('/categories', categoriesController.createCategories);
routes.get('/categories', categoriesController.getCategories);

module.exports = routes;