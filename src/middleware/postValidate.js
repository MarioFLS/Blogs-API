const joi = require('joi');

const requiredItemString = joi.string().not().empty().required();

const create = (req, res, next) => {
  const postValidate = joi.object({
      title: requiredItemString,
      content: requiredItemString,
      categoryIds: joi.array().items(joi.number().required()).not().empty()
        .required(), 
      }).messages({
      'string.empty': 'Some required fields are missing',
      'any.required': 'Some required fields are missing',
      'array.includesRequiredUnknowns': '"categoryIds" not found',
    });
  const { error } = postValidate.validate(req.body);
  if (error) { return res.status(400).json({ message: error.details[0].message }); }
  return next();
};

const edit = (req, res, next) => {
  const postValidate = joi.object({
      title: requiredItemString,
      content: requiredItemString,
      }).messages({
      'string.empty': 'Some required fields are missing',
      'any.required': 'Some required fields are missing',
    });
  const { error } = postValidate.validate(req.body);
  if (error) { return res.status(400).json({ message: error.details[0].message }); }
  return next();
};

module.exports = { create, edit };
