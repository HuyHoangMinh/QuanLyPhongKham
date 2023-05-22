const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("PhongKham", "root", "Minh@0937698901", {
  host: "localhost",
  dialect: "mysql",
});
let connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable connect to the database", error);
  }
};

module.exports = connectDB;
