const sequelize = require('sequelize');
const db = require('../config/dbORM');
const Users = require('./Users');
const Roles = require('./Roles');

const UserRoles = db.define(
  'UserRoles',
  {
    RoleId: {
      type: sequelize.Sequelize.INTEGER,
      references: {
        model: Roles,
        key: 'RoleId'
      }
    },
    UserId: {
      type: sequelize.Sequelize.INTEGER,
      references: {
        model: Users,
        key: 'UserId'
      }
    }
  }
);

module.exports = UserRoles;
