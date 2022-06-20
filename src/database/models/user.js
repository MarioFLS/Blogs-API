'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      id: { type: DataTypes.INTERGER, primaryKey: true, autoIncrement: true },
      displayName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    { timestamps: false });

  User.associate = (models) => {
    User.hasOne(models.BlogPosts,
      {foreignKey: "userId", as: 'blogPosts'});
  }
  return User;
};
