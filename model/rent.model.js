const db = require('../config/db');

// constructor
const Rent = function(rent) {
  this.rentId = rent.rentId;
  this.customerId = rent.customerId;
  this.itemId = rent.itemId;
  this.rentStatusId = rent.rentStatusId;
};

var queryResult = {
  status: undefined,
  message: '',
  data: []
};

Rent.create = function(newRent) {
  var rentUpdated = [newRent.customerId, newRent.itemId, newRent.rentStatusId];
  var query = 'INSERT INTO Rents (CustomerId, ItemId, RentStatusId) VALUES (?);';
  query =
    query +
    'UPDATE Rents SET Rents.RentId = LAST_INSERT_ID() WHERE Rents.id = LAST_INSERT_ID();';
  db.query(query, [rentUpdated], (err, res) => {
    if (err) {
      queryResult.status = 400;
      queryResult.message = 'Error occured while creating rent due to ' + err;
      queryResult.data = [];
    } else {
      queryResult.status = 200;
      queryResult.message = 'Create Rent success';
      queryResult.data = res;
    }
  });
  return queryResult;
};

Rent.update = function (id, rent) {
  var values = [rent.rentId, rent.customerId, rent.itemId, rent.rentStatusId];
  var dataById = this.getById(id);
  if (dataById.status === 200) {
    var query =
      'UPDATE Rents SET Rents.EndDateTime = now() WHERE Rents.RentId = ? AND Rents.EndDateTime IS NULL; INSERT INTO Rents (RentId, CustomerId, ItemId, RentStatusId) VALUES (?);';

    db.query(query, [id, values], function(error, rows, fields) {
      if (error) {
        queryResult.status = 400;
        queryResult.message = 'Update rent failed due to ' + error;
      } else {
        queryResult.status = 200;
        queryResult.message = 'Update rent success';
      }
    });
  }
  return queryResult;
};

Rent.getAll = function() {
  db.query('SELECT * FROM Items WHERE Rents.EndDateTime IS NULL', (err, row, fields) => {
    if (err) {
      queryResult.data = [];
      queryResult.message = 'Fetch rents failed';
      queryResult.status = 400;
    } {
      queryResult.data = row;
      queryResult.status = 200;
      queryResult.message = 'Fetch rents success';
    }
  });

  return queryResult;
};

Rent.getById = function(id) {
  var query =
    'SELECT Rents.* FROM Rents WHERE Rents.RentId = ? AND Rents.EndDateTime IS NULL';
  db.query(query, id, function(error, rows, field) {
    if (error) {
      queryResult.data = [];
      queryResult.message = 'Fetch rent by id failed due to ' + error;
      queryResult.status = 400;
    } else {
      queryResult.data = rows;
      queryResult.status = 200;
      queryResult.message = 'Fetch rent by id success';
    }
  });
  return queryResult;
};

Rent.deleteItem = function(id) {
  var dataFetch = this.getById(id);
  if (dataFetch.status === 200) {
    var query =
      'UPDATE Rents SET Rents.EndDateTime = now() WHERE Rents.RentId = ? AND Rents.EndDateTime IS NULL';
    db.query(query, id, function(error, rows, field) {
      if (error) {
        queryResult.status = 401;
        queryResult.message = 'Delete rent error due to ' + error;
        queryResult.data = [];
      } else {
        queryResult.data = [];
        queryResult.message = 'Delete rent success';
        queryResult.status = 200;
      }
    });
  } else {
    queryResult.status = 404;
    queryResult.message = 'Rent Id not found';
    queryResult.data = [];
  }
  return queryResult;
};

module.exports = Rent;