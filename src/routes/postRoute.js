const express = require('express');
const postController = require('../controllers/postController');
const emailValidate = require('../middleware/emailValidate');

const routes = express.Router();

routes.post('/', emailValidate, postController.createPost);
routes.get('/', postController.getPost);
routes.get('/:id', postController.getPostId);

module.exports = routes;