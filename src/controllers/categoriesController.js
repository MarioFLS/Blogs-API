const categoriesRoute = require('../services/categoriesService');

const createCategories = async (req, res, next) => {
  const categories = await categoriesRoute.createCategories(req.body);

  if (categories.error) return next(categories.error);

  const { id, name } = categories.dataValues;
  res.status(201).json({ id, name });
};

module.exports = { createCategories };