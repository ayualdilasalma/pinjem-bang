const Sequelize = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql'
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established');
  })
  .catch(err => {
    console.log('Unable to connect to db:', err);
  });

module.exports = sequelize;
