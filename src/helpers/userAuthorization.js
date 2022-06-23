const jwt = require('jsonwebtoken');
const searchHelpers = require('./searchInDatabase');

const userAuthorization = async (authorization) => {
  console.log(authorization);
  const email = jwt.decode(authorization).payload;
  console.log(email);
  const { dataValues } = await searchHelpers.findEmailUser(email);
  return dataValues;
};
module.exports = userAuthorization;