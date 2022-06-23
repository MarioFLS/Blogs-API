const jwt = require('jsonwebtoken');
const searchHelpers = require('./searchInDatabase');

const userAuthorization = async (authorization) => {
  const email = jwt.decode(authorization).payload;
  const user = await searchHelpers.findEmailUser(email);
  return user;
};
module.exports = userAuthorization;