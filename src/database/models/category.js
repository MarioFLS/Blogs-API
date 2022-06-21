'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
    });

  Category.associate = (models) => {
    Category.hasMany(models.PostCategory,
      {foreignKey: "categoryId", as: 'postCategory'});
  }
  return Category;
};