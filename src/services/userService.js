const tokenJwt = require('jsonwebtoken');
const { User } = require('../database/models');
const authorizationHelpers = require('../helpers/userAuthorization');

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

const deleteUser = async (authorization) => {  
  const user = await authorizationHelpers(authorization);
  await User.destroy({ where: { id: user.id } });
  return user;
};

module.exports = { verifyLogin, createUser, getUser, deleteUser };
