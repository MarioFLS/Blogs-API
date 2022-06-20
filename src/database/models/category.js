'use strict';
module.exports = (sequelize, DataTypes) => {
  const Category = sequelize.define(
    'Category',
    {
      id: { type: DataTypes.INTERGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
    },
    { timestamps: false });

  Category.associate = (models) => {
    Category.hasMany(models.PostCategory,
      {foreignKey: "categoryId", as: 'postCategory'});
  }
  return Category;
};