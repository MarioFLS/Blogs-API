const helpers = require('../helpers/searchInDatabase');
const postService = require('../services/postService');

const createPost = async (req, res, next) => {
  const post = await postService.createPost(req.body, req.headers);
  if (post.error) return next(post.error);
  const { dataValues } = await helpers.findPost(post);

  return res.status(201).json(dataValues);
};

module.exports = { createPost };