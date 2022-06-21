require('dotenv').config();

const userService = require('../services/userService');

const userLogin = async (req, res, next) => {
  const { email, password } = req.body;
  const login = await userService.verifyLogin(email, password);
  if (login.error) { return next(login.error); } 

  return res.status(200).json(login);
};

const createUser = async (req, res, next) => {
  const { displayName, email, password, image } = req.body;
  const user = await userService.createUser(displayName, email, password, image);
  if (user.error) { return next(user.error); }
  return res.status(201).json(user);
};

module.exports = { userLogin, createUser };