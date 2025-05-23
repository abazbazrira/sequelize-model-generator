const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB_DATABASE ?? process.env.DB_NAME,
  process.env.DB_USERNAME ?? process.env.DB_USER,
  process.env.DB_PASSWORD ?? process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "postgres",
    logging: false,
  }
);

module.exports = { sequelize };
