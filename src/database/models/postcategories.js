'use strict';
module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define(
    'User',
    {
      postId: { type: DataTypes.INTERGER, primaryKey: true, autoIncrement: true, foreignKey:true },
      categoryId: { type: DataTypes.INTERGER, primaryKey: true, autoIncrement: true, foreignKey:true },
    },
    { timestamps: false });

  PostCategory.associate = (models) => {
    models.BlogPost.belongsToMany(models.BlogPost,
      {foreignKey: "postId",
      outherKey: 'categoryId',
      as: 'blogPosts',
      through: PostCategory });

    models.Category.belongsToMany(modelsCategory,
        {foreignKey: "categoryId",
        outherKey: '"postId',
        as: 'category',
        through: PostCategory });
  }
  return PostCategory;
};
