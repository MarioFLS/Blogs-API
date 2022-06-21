const express = require('express');
const userController = require('../controllers/userController');
const validateToken = require('../middleware/validateToken');

const routes = express.Router();

routes.post('/login', userController.userLogin);
routes.post('/user', userController.createUser);
routes.get('/user', validateToken, userController.getUser);

module.exports = routes;