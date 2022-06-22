const joi = require('joi');
const { Category } = require('../database/models');

const getCategories = (name) => Category.findAll({ where: { name } });

const createCategories = async ({ name }) => {
  const nameValidation = joi.object({ name: joi.string().not().empty().required() });
  
  const { error } = nameValidation.validate({ name });
  if (error) return { error: { code: 400, message: error.details[0].message } };
  
  const checkCategory = await getCategories(name);
  if (checkCategory.length > 0) {
    return { error: 
      { code: 400, message: 'Essa categoria já existe' } }; 
  }
  
  const category = Category.create({ name });
  return category;
};

module.exports = { getCategories, createCategories };
