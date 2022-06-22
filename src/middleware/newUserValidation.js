const joi = require('joi');

const requiredItemString = joi.string().not().empty().required();

module.exports = (req, res, next) => {
  const { displayName, email, password } = req.body;
  const newUserValidation = joi.object({
    displayName: requiredItemString.min(8),
    password: requiredItemString.min(6),
    email: requiredItemString.email(),
  });
  const { error } = newUserValidation.validate({ displayName, email, password });
  if (error) res.status(400).json({ message: error.details[0].message });
  return next();
};