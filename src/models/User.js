const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../db/config.js");

const isOlder13 = () => {
  const startDate = new Date();
  return startDate.setFullYear(startDate.getFullYear() - 13);
};
class User extends Model {}

User.init(
  {
    _id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: Sequelize.UUIDV4,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dop: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isBefore: isOlder13(),
      },
    },
    avatar: {
      type: DataTypes.BLOB("medium"),
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Iltimos email kiriting",
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    moduleName: "User",
  }
);

module.exports = { User };
