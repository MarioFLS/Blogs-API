const joi = require('joi');
const tokenJwt = require('jsonwebtoken');
const { User } = require('../database/models');

const requiredItemString = joi.string().empty().required();
const secret = process.env.JWT_SECRET;

const generateToken = (payload) => tokenJwt.sign({ payload }, secret, { expiresIn: '1h' });

const verifyLogin = async (email, password) => {
  if (!email || !password) {
    return { error: { code: 400, message: 'Some required fields are missing' } };
  }
  const user = await User.findOne({ where: { email, password } });
  
  if (!user) return { error: { code: 400, message: 'Invalid fields' } };
  
  const token = generateToken(email);
  return { token };
};

const createUser = async (displayName, email, password, image) => {
  const validatyNewUser = joi.object({
    displayName: requiredItemString.min(8),
    password: requiredItemString.min(6),
    email: requiredItemString.email(),
  });
  const { error } = validatyNewUser.validate({ displayName, email, password });
  if (error) return { error: { code: 400, message: error.details[0].message } };

  const user = await User.findOne({ where: { email } });
  if (user) return { error: { code: 409, message: 'User already registered' } };

  await User.create({ displayName, email, password, image });
  const token = generateToken(email);
  return { token };
};

const getUser = async (id) => {  
  const user = await User.findOne({ where: { id },
    attributes: ['id', 'displayName', 'email', 'image'] });
  if (!user) return { error: { code: 404, message: 'User does not exist' } };
  return user;
};

module.exports = { verifyLogin, createUser, getUser };
