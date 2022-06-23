'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'PostCategory',
    {
      postId: { type: DataTypes.INTEGER, primaryKey: true },
      categoryId: { type: DataTypes.INTEGER, primaryKey: true },
    },
  );

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.Category, {
      as: 'categories',
      through: PostCategory,
      foreignKey: 'postId',
      outherKey: 'categoryId',
    });

    models.Category.belongsToMany(models.BlogPost, {
      as:'blogPost',
      through: PostCategory,
      foreignKey: 'categoryId',
      outherKey: 'postId',
    });
  };
  return PostCategory;
};
