const jwt = require('jsonwebtoken');
const searchHelpers = require('./searchInDatabase');

const userAuthorization = async (authorization) => {
  const email = jwt.decode(authorization).payload;
  const { dataValues } = await searchHelpers.findEmailUser(email);
  return dataValues;
};
module.exports = userAuthorization;