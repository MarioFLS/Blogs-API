const joi = require('joi');

const requiredItemString = joi.string().not().empty().required();

module.exports = (req, res, next) => {
  const emailValidate = joi.object({
      title: requiredItemString,
      content: requiredItemString,
      categoryIds: joi.array().items(joi.number().required()).not().empty()
        .required(), 
      }).messages({
      'string.empty': 'Some required fields are missing',
      'any.required': 'Some required fields are missing',
      'array.includesRequiredUnknowns': '"categoryIds" not found',
    });
  const { error } = emailValidate.validate(req.body);
  if (error) { return res.status(400).json({ message: error.details[0].message }); }
  return next();
};
