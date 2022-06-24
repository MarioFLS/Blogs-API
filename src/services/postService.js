const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const config = require('../database/config/config');
const { BlogPost, PostCategory } = require('../database/models');
const searchHelpers = require('../helpers/searchInDatabase');
const authorizationHelpers = require('../helpers/userAuthorization');
const { postRequestFormat } = require('../helpers/requestFormat');

const sequelize = new Sequelize(config.development);

const getPost = async (id = 0) => {
  const getAllPost = await BlogPost.findAll(postRequestFormat);
  const getPostById = await BlogPost.findOne({ where: { id }, ...postRequestFormat });
  return { getAllPost, getPostById };
};

const insertPost = async (title, content, authorization) => {
  const email = jwt.decode(authorization).payload;
  try {
    const { dataValues: { id: userId } } = await searchHelpers.findEmailUser(email);
    const post = await BlogPost.create({ title, content, userId });
    return post.dataValues;
  } catch (error) {
    return [];
  }
};

const createPost = async ({ title, content, categoryIds }, { authorization }) => {
  const findCategory = await searchHelpers.findCategory(categoryIds);
  if (findCategory.length !== categoryIds.length) {
    return { error: { code: 400, message: '"categoryIds" not found' } };
  }
  const post = await insertPost(title, content, authorization);
  if (post.length === 0) {
    return { error: { code: 400, message: '"token/email" not found' } };
  }
  await sequelize.transaction(async (transactionPost) => {
    const categories = categoryIds.map((categoryId) => ({ postId: post.id, categoryId }));
    await PostCategory.bulkCreate(categories, transactionPost);
  });
  return post;
};

const getPostId = async (id) => {
  const { getPostById } = await getPost(id);
  if (!getPostById) return { error: { code: 404, message: 'Post does not exist' } };
  return getPostById.dataValues;
};

const editPost = async ({ title, content }, { authorization }, id) => {
  const post = await getPostId(id);
  const isUserAuthorized = await authorizationHelpers(authorization);
  if (post.userId === isUserAuthorized.dataValues.id) {
    return BlogPost.update({ title, content }, { where: { id } });
  }
  if (post.userId !== isUserAuthorized.id) {
    return { error: { code: 401, message: 'Unauthorized user' } };
  }
  return post;
};

const deletePost = async (authorization, id) => {
  const post = await getPostId(id);
  const isUserAuthorized = await authorizationHelpers(authorization);
  if (post.error) return post;
  if (post.userId === isUserAuthorized.id) {
    return BlogPost.destroy({ where: { id } });
  }
  if (post.userId !== isUserAuthorized.id) {
    return { error: { code: 401, message: 'Unauthorized user' } };
  }
  return post;
};

const searchPost = async (q) => BlogPost.findAll({
    where: { [Op.or]: [
        { title: { [Op.like]: `%${q}%` } },
        { content: { [Op.like]: `%${q}%` } },
      ] },
...{ postRequestFormat }.postRequestFormat });

module.exports = {
  createPost,
  getPost,
  getPostId,
  editPost,
  deletePost,
  searchPost,
};
