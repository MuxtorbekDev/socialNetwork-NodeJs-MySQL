const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../db/config.js");

class Post extends Model {}

Post.init(
  {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: "Post",
  }
);

module.exports = { Post };
