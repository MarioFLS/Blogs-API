const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const config = require('../database/config/config');
const { BlogPost, Category, User, PostCategory } = require('../database/models');
const helpers = require('../helpers/searchInDatabase');

const sequelize = new Sequelize(config.development);

const getPost = async () => {
  const post = await BlogPost.findAll({
    include: [
      {
        model: User,
        as: 'user',
        attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      },
      {
        model: Category,
        as: 'categories',
        attributes: { exclude: ['createdAt', 'updatedAt'] },
        through: { attributes: [] },
      }] });
  return post;
};

const getPostId = async (id) => {
  const post = await getPost();
  const resultPost = post.reduce((acc, item) => {
    if (item.id === Number(id)) acc.user = item.dataValues; 
    return acc;
  }, {});
  if (!resultPost.user) return { error: { code: 404, message: 'Post does not exist' } };
  return resultPost;
};

const insertPost = async (title, content, authorization) => {
  const email = jwt.decode(authorization).payload;
  const {
    dataValues: { id: userId },
  } = await helpers.findEmailUser(email);
  const post = await BlogPost.create({ title, content, userId });
  return post.dataValues;
};

const createPost = async ({ title, content, categoryIds }, { authorization }) => {
  const findCategory = await helpers.findCategory(categoryIds);
  if (findCategory.length === 0) {
    return { error: { code: 400, message: '"categoryIds" not found' } };
  }
  const { id: postId } = await insertPost(title, content, authorization);
  await sequelize.transaction(async (post) => {
    const categories = categoryIds.map((categoryId) => ({ postId, categoryId }));
    await PostCategory.bulkCreate(categories, post);
  });
  return postId;
};

module.exports = { createPost, getPost, getPostId };
