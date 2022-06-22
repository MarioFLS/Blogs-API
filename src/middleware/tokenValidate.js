require('dotenv').config();
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const token = jwt.decode(authorization, process.env.JWT_SECRET);

  if (!authorization) return res.status(401).json({ message: 'Token not found' });
  if (!token) return res.status(401).json({ message: 'Expired or invalid token' });

  next();
};
