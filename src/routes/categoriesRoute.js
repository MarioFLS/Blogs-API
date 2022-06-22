const express = require('express');
const categoriesController = require('../controllers/categoriesController');
const nameValidation = require('../middleware/nameValidation');

const routes = express.Router();

routes.post('/', nameValidation, categoriesController.createCategories);
routes.get('/', categoriesController.getCategories);

module.exports = routes;