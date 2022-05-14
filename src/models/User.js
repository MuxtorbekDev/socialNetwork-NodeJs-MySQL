const { Sequelize, DataTypes, Model } = require("sequelize");
const { sequelize } = require("../db/config.js");
const bcrypt = require("bcrypt");

const isOlder13 = () => {
  const startDate = new Date();
  return startDate.setFullYear(startDate.getFullYear() - 13);
};
class User extends Model {
  async verifyPassword(password) {
    try {
      const login = await bcrypt.compare(password, this.password);
      return login;
    } catch (e) {
      console.log(e);
    }
  }
}

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
    dob: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        isBefore: new Date(isOlder13()).toString(),
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

User.beforeCreate(async (user) => {
  user.password = await bcrypt.hash(user.password, 12);
});

module.exports = { User };
