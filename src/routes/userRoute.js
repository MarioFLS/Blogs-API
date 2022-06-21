const express = require('express');
const userController = require('../controllers/userController');

const routes = express.Router();

routes.post('/', userController.userLogin);

module.exports = routes;