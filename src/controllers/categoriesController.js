const categoriesRoute = require('../services/categoriesService');
const { Category } = require('../database/models');

const createCategories = async (req, res, next) => {
  const categories = await categoriesRoute.createCategories(req.body);

  if (categories.error) return next(categories.error);

  const { id, name } = categories.dataValues;
  res.status(201).json({ id, name });
};

const getCategories = async (_req, res) => {
  const getAll = await Category.findAll({ attributes: ['id', 'name'] });
  res.status(200).json(getAll);
};

module.exports = { createCategories, getCategories };