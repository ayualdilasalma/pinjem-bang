const db = require('../config/db');

// constructor
const Role = function (role) {
    this.roleId = role.roleId;
    this.name = role.name;
    this.description = role.description;
};

var queryResult = {
    status: undefined,
    message: '',
    data: []
};

Role.create = newRole => {
    var query = 'INSERT INTO Roles (roleId, Name, Description) VALUES (?);';
    query =
      query +
      'UPDATE Roles SET Roles.roleId = LAST_INSERT_ID() Roles.id = LAST_INSERT_ID()';
    db.query(query, newRole, (err, res) => {
      if (err) {
        queryResult.status = 400;
        queryResult.message = 'Error occured while creating Role due to ' + err;
        queryResult.data = [];
      } else {
        queryResult.status = 200;
        queryResult.message = 'Create Role success';
        queryResult.data = res;
      }
  
      return queryResult;
    });
  };
  
  Role.update = (id, Role) => {
    var dataById = this.getById(id);
    if (dataById.status === 200) {
      var query =
        'UPDATE Roles SET Roles.EndDateTime = now() WHERE Roles.roleId = ? AND Roles.EndDateTime IS NULL; INSERT INTO Roles (roleId, Name, Description) VALUES (?);';
  
      db.query(query, [id, Role], function(error, rows, fields) {
        if (error) {
          queryResult.status = 400;
          queryResult.message = 'Update Role failed';
        } else {
          queryResult.status = 200;
          queryResult.message = 'Update Role success';
        }
      });
    }
    return queryResult;
  };
  
  Role.getAll = () => {
    db.query('SELECT * FROM Roles', (err, row, fields) => {
      if (err) {
        queryResult.data = [];
        queryResult.message = 'Fetch Roles failed';
        queryResult.status = 400;
      }
      queryResult.data = row;
      queryResult.status = 200;
      queryResult.message = 'Fetch Roles success';
    });
  
    return queryResult;
  };
  
  Role.getById = function(id) {
    var query =
      'SELECT Roles.* FROM Roles WHERE Roles.roleId = ? AND Roles.EndDateTime IS NULL';
    db.query(query, id, function(error, rows, field) {
      if (error) {
        (queryResult.status = 400), (queryResult.data = []);
      } else {
        (queryResult.status = 200), (queryResult.data = rows);
      }
    });
    return queryResult;
  };
  
  Role.deleteRole = function(id) {
    var dataFetch = this.getById(id);
    if (dataFetch.status === 200) {
      var query =
        'UPDATE Roles SET Roles.EndDateTime = now() WHERE Roles.roleId = ? AND Roles.EndDateTime IS NULL';
      db.query(query, id, function(error, rows, field) {
        if (error) {
          queryResult.status = 401;
          queryResult.message = 'Delete Role error due to ' + error;
          queryResult.data = [];
        } else {
          (queryResult.data = []),
            (queryResult.message = 'Delete Role success'),
            (queryResult.status = 200);
        }
      });
    } else {
      queryResult.status = 404;
      queryResult.message = 'Role Id not found';
      queryResult.data = [];
    }
    return queryResult;
  };
  
  module.exports = Role;
  