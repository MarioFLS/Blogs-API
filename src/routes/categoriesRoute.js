const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const validateToken = require('../middleware/validateToken');

const routes = express.Router();

routes.post('/categories', validateToken, categoriesController.createCategories);

module.exports = routes;