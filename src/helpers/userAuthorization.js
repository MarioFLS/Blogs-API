const jwt = require('jsonwebtoken');
const searchHelpers = require('./searchInDatabase');

const userAuthorization = async (authorization) => {
  const email = jwt.decode(authorization).payload;
  const user = await searchHelpers.findEmailUser(email);
  if (!user) return { error: { code: 401, message: 'Unauthorized user' } };
  return user;
};
module.exports = userAuthorization;