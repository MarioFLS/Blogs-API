const express = require('express');
const postController = require('../controllers/postController');
const postValidate = require('../middleware/postValidate');

const routes = express.Router();

routes.post('/', postValidate.create, postController.createPost);
routes.get('/', postController.getPost);
routes.get('/search', postController.searchPost);
routes.get('/:id', postController.getPostId);
routes.put('/:id', postValidate.edit, postController.editPost);
routes.delete('/:id', postController.deletePost);

module.exports = routes;