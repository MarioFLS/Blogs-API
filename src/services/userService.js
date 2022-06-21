const { User } = require('../database/models');

const verifyLogin = async ({ email, password }) => {
  if (!email || !password) {
    return { error: { code: 400, message: 'Some required fields are missing' } }; 
  }
const user = await User.findOne({ where: { email, password } });
if (!user) return { error: { code: 400, message: 'Invalid fields' } };
};

module.exports = { verifyLogin };
