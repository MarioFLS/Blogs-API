const joi = require('joi');

module.exports = (req, res, next) => {
  const { name } = req.body;
  const nameValidation = joi.object({ name: joi.string().not().empty().required() });
  
  const { error } = nameValidation.validate({ name });
  if (error) return res.status(400).json({ message: error.details[0].message });

  return next();
};