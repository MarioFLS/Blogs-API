const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const { Op } = require('sequelize');
const config = require('../database/config/config');
const { BlogPost, PostCategory, User, Category } = require('../database/models');
const searchHelpers = require('../helpers/searchInDatabase');
const authorizationHelpers = require('../helpers/userAuthorization');

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

const insertPost = async (title, content, authorization) => {
  const email = jwt.decode(authorization).payload;
  const { dataValues: { id: userId } } = await searchHelpers.findEmailUser(email);
  const post = await BlogPost.create({ title, content, userId });
  return post.dataValues;
};

const createPost = async ({ title, content, categoryIds }, { authorization }) => {
  const findCategory = await searchHelpers.findCategory(categoryIds);
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

const getPostId = async (id) => {
  const post = await getPost();
  const resultPost = post.reduce((acc, item) => {
    if (item.id === Number(id)) { acc.user = item.dataValues; } 
      return acc;
    }, {});

  if (!resultPost.user) return { error: { code: 404, message: 'Post does not exist' } };
  return resultPost.user;
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
  } if (post.userId !== isUserAuthorized.id) {
    return { error: { code: 401, message: 'Unauthorized user' } }; 
  }
  return post;
};

const searchPost = async (q) => BlogPost.findAll({ where: {
    [Op.or]: [
      { title: { [Op.like]: `%${q}%` } },
      { content: { [Op.like]: `%${q}%` } },
    ],
  },
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

module.exports = { createPost, getPost, getPostId, editPost, deletePost, searchPost };
