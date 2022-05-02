const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../db/config.js");

class Comment extends Model {}

Comment.init(
  {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
  },
  {
    sequelize,
    modelName: "Comment",
  }
);

module.exports = { Comment };
