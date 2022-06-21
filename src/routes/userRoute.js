const express = require('express');
const userController = require('../controllers/userController');

const routes = express.Router();

routes.post('/login', userController.userLogin);
routes.post('/user', userController.createUser);

module.exports = routes;