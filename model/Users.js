const sequelize = require('sequelize');
const db = require('../config/dbORM');

const Users = db.define(
  'Users',
  {
    UserId: {
      type: sequelize.DataTypes.INTEGER
    },
    Name: {
      type: sequelize.DataTypes.STRING
    },
    Email: {
      type: sequelize.DataTypes.STRING
    },
    Password: {
      type: sequelize.DataTypes.STRING
    },
    StartDateTime: {
      type: sequelize.DataTypes.DATE
    },
    EndDateTime: {
      type: sequelize.DataTypes.DATE
    }
  },
  {
    // enable timestamps
    timestamps: true,
    createdAt: false,
    StartDateTime: 'updateTimestamp',
    updatedAt: false
  }
);

module.exports = Users;
