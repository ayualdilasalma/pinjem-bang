const db = require('../config/db');

const User = function (user) {
    this.userId = user.userId;
    this.name = user.name;
    this.email = user.email;
    this.passcode = user.passcode;
};


User.create = newUser => {
    var query = 'INSERT INTO Users (userd, Name, Email, Passcode) VALUES (?);';
    query =
      query +
      'UPDATE Users SET Users.userd = LAST_INSERT_ID() Users.id = LAST_INSERT_ID()';
    db.query(query, newUser, (err, res) => {
      if (err) {
        queryResult.status = 400;
        queryResult.message = 'Error occured while creating User due to ' + err;
        queryResult.data = [];
      } else {
        queryResult.status = 200;
        queryResult.message = 'Create User success';
        queryResult.data = res;
      }
  
      return queryResult;
    });
  };
  
  User.update = (id, User) => {
    var dataById = this.getById(id);
    if (dataById.status === 200) {
      var query =
        'UPDATE Users SET Users.EndDateTime = now() WHERE Users.userd = ? AND Users.EndDateTime IS NULL; INSERT INTO Users (userd, Name, Email, Passcode) VALUES (?);';
  
      db.query(query, [id, User], function(error, rows, fields) {
        if (error) {
          queryResult.status = 400;
          queryResult.message = 'Update User failed';
        } else {
          queryResult.status = 200;
          queryResult.message = 'Update User success';
        }
      });
    }
    return queryResult;
  };
  
  User.getAll = () => {
    db.query('SELECT * FROM Users', (err, row, fields) => {
      if (err) {
        queryResult.data = [];
        queryResult.message = 'Fetch Users failed';
        queryResult.status = 400;
      }
      queryResult.data = row;
      queryResult.status = 200;
      queryResult.message = 'Fetch Users success';
    });
  
    return queryResult;
  };
  
  User.getById = function(id) {
    var query =
      'SELECT Users.* FROM Users WHERE Users.userd = ? AND Users.EndDateTime IS NULL';
    db.query(query, id, function(error, rows, field) {
      if (error) {
        (queryResult.status = 400), (queryResult.data = []);
      } else {
        (queryResult.status = 200), (queryResult.data = rows);
      }
    });
    return queryResult;
  };
  
  User.deleteUser = function(id) {
    var dataFetch = this.getById(id);
    if (dataFetch.status === 200) {
      var query =
        'UPDATE Users SET Users.EndDateTime = now() WHERE Users.userd = ? AND Users.EndDateTime IS NULL';
      db.query(query, id, function(error, rows, field) {
        if (error) {
          queryResult.status = 401;
          queryResult.message = 'Delete User error due to ' + error;
          queryResult.data = [];
        } else {
          (queryResult.data = []),
            (queryResult.message = 'Delete User success'),
            (queryResult.status = 200);
        }
      });
    } else {
      queryResult.status = 404;
      queryResult.message = 'User Id not found';
      queryResult.data = [];
    }
    return queryResult;
  };
  
  module.exports = User;
  