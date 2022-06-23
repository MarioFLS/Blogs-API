const helpers = require('../helpers/searchInDatabase');
const postService = require('../services/postService');

const createPost = async (req, res, next) => {
  const post = await postService.createPost(req.body, req.headers);
  if (post.error) return next(post.error);
  const { dataValues } = await helpers.findPost(post);

  return res.status(201).json(dataValues);
};

const getPost = async (_req, res) => {
  const post = await postService.getPost();
  const resultPost = post.map((item) => item.dataValues);
  return res.status(200).json(resultPost);
};

const getPostId = async (req, res, next) => {
  const { id } = req.params;
  const post = await postService.getPostId(id);

  if (post.error) return next(post.error);
  return res.status(200).json(post);
};

module.exports = { createPost, getPost, getPostId };
