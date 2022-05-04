const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../db/config.js");

class Photo extends Model {}

Photo.init(
  {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    data: {
      type: DataTypes.BLOB("medium"),
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    modelName: "Photo",
  }
);

module.exports = { Photo };
