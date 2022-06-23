const { User, Category } = require('../database/models');

const postRequestFormat = {
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
    }] };

module.exports = { postRequestFormat };