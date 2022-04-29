const { Sequelize } = require("sequelize");
const sequelize = new Sequelize("myBlog", "root", "", {
  host: "localhost",
  dialect: "mysql",
  port: 3306,
  logging: false,
});

const connect = async (forceOption) => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: forceOption });
    console.log("Ma'lumotlar bazasi bilan aloqa bog'landi...");
  } catch (e) {
    console.log(e);
  }
};

module.exports = { connect, sequelize };
