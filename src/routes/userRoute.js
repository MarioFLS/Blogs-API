const express = require('express');
const userController = require('../controllers/userController');
const tokenValidate = require('../middleware/tokenValidate');
const newUserValidation = require('../middleware/newUserValidation');

const routes = express.Router();

routes.post('/login', userController.userLogin);
routes.post('/user', newUserValidation, userController.createUser);
routes.get('/user', tokenValidate, userController.getAllUser);
routes.get('/user/:id', tokenValidate, userController.getUser);

module.exports = routes;