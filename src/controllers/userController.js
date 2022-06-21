const tokenJwt = require('jsonwebtoken');
require('dotenv').config();
const userService = require('../services/userService');

const secret = process.env.JWT_SECRET;

const userLogin = async (req, res, next) => {
  const login = await userService.verifyLogin(req.body);
  if (login) { return next(login.error); } 
  const { email, password } = req.body;
  const payload = { email, password };
  const token = tokenJwt.sign(payload, secret, { expiresIn: '1h' });

  return res.status(200).json({ token });
};

module.exports = { userLogin };