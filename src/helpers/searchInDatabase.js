const { User, BlogPost, Category } = require('../database/models');

const findEmailUser = (email) => User.findOne({ where: { email } });

const findPost = (id) => BlogPost.findOne({ where: { id } });

const findCategory = (categoryIds) =>
  Category.findAll({ where: { id: [categoryIds] } });

module.exports = { findEmailUser, findPost, findCategory };
