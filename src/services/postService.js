const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const config = require('../database/config/config');
const { BlogPost, PostCategory } = require('../database/models');
const searchHelpers = require('../helpers/searchInDatabase');
const formatHelpers = require('../helpers/requestFormat');

const sequelize = new Sequelize(config.development);

const getPost = async () => {
  const post = await BlogPost.findAll(formatHelpers.postRequestFormat);
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

const userAuthorization = async (authorization) => {
  const email = jwt.decode(authorization).payload;
  const { dataValues } = await searchHelpers.findEmailUser(email);
  return dataValues;
};

const editPost = async ({ title, content }, { authorization }, id) => {
  const post = await getPostId(id);
  const isUserAuthorized = await userAuthorization(authorization);
  if (post.userId === isUserAuthorized.id) {
    return BlogPost.update({ title, content }, { where: { id } });
  }
  return { error: { code: 401, message: 'Unauthorized user' } };
};

const deletePost = async (authorization, id) => {
  const post = await getPostId(id);
  const isUserAuthorized = await userAuthorization(authorization);
  
  if (post.error) return post;
  if (post.userId === isUserAuthorized.id) {
    return BlogPost.destroy({ where: { id } });
  }
  return { error: { code: 401, message: 'Unauthorized user' } };
};

module.exports = { createPost, getPost, getPostId, editPost, deletePost };
