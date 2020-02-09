const sequelize = require('sequelize');
const db = require('../config/dbORM');
const Users = require('./Users');

const Items = db.define(
  'Items',
  {
    ItemId: {
      type: sequelize.Sequelize.INTEGER
    },
    Name: {
      type: sequelize.Sequelize.STRING
    },
    Description: {
      type: sequelize.Sequelize.STRING
    },
    OwnerId: {
      type: sequelize.Sequelize.INTEGER,
      references: {
        model: Users,
        key: 'id'
      }
    },
    StartDateTime: {
      type: sequelize.Sequelize.DATE
    },
    EndDateTime: {
      type: sequelize.Sequelize.DATE
    }
  },
  {
    // enable timestamps
    timestamps: true,
    // don't want to set field as createdAt
    createdAt: false,
    // I want the field name to be startDateTime
    StartDateTime: 'updateTimestamp',
    updatedAt: false
  }
);

module.exports = Items;
