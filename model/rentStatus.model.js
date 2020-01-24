const db = require('../config/db');

const RentStatus = function (rentStatus) {
  this.rentStatusId = rentStatus.rentStatusId;
  this.name = rentStatus.name;
  this.description = rentStatus.description;
};

var response = {
  status: undefined,
  message: '',
  data: []
};

RentStatus.create = newStatus => {
  var values = [newStatus.name, newStatus.description];
  var query = 'INSERT INTO RentStatuses (name, description) VALUES (?);';
  query =
    query +
    'UPDATE RentStatuses SET RentStatuses.RentStatusId = LAST_INSERT_ID() WHERE RentStatuses.id = LAST_INSERT_ID()';

  db.query(query, [values], (err, res) => {
    if (err) {
      response.status = 400;
      response.message =
        'Error occured while creating rent status due to ' + err;
      response.data = [];
    } else {
      response.status = 200;
      response.message = 'Create Rent Status success';
      response.data = res;
    }

    return response;
  });
};

RentStatus.getById = id => {
  var query =
    'SELECT RentStatuses.* FROM RentStatuses WHERE RentStatuses.RentStatusId = ? AND RentStatuses.EndDateTime IS NULL';
  db.query(query, id, function (error, rows, field) {
    if (error) {
      (response.status = 400), (response.data = []);
    } else {
      (response.status = 200), (response.data = rows);
    }
  });
  return response;
};

RentStatus.update = (id, rentStatus) => {
  var dataFetch = this.getById(id);
  if (dataFetch.status === 200) {
    var query =
      'UPDATE RentStatuses SET RentStatuses.EndDateTime = now() WHERE RentStatuses.RentStatusId = ? AND RentStatuses.EndDateTime IS NULL;';
    query = query + 'INSERT INTO RentStatuses (RentStatusId, Name, Description) VALUES (?);';
    var values = [rentStatus.rentStatusId, rentStatus.name, rentStatus.description];

    db.query(query, [id, values], function (error, rows, fields) {
      if (error) {
        response.status = 400;
        response.message = 'Update rent status failed';
      } else {
        response.status = 200;
        response.message = 'Update rent status success';
      }
    });
  }
  return response;
};

RentStatus.getAll = () => {
  db.query('SELECT * FROM RentStatuses WHERE RentStatuses.EndDateTime IS NULL', (err, row, fields) => {
    if (err) {
      response.data = [];
      response.message = 'Fetch rent status failed';
      response.status = 400;
    }
    response.data = row;
    response.status = 200;
    response.message = 'Fetch rent status success';
  });

  return response;
};

RentStatus.deleteStatus = (id) => {
  var dataFetch = this.getById(id);
  if (dataFetch.status === 200) {
    var query =
      'UPDATE RentStatuses SET RentStatuses.EndDateTime = now() WHERE RentStatuses.RentStatusId = ? AND RentStatuses.EndDateTime IS NULL';
    db.query(query, id, function (error, rows, field) {
      if (error) {
        response.status = 401;
        response.message = 'Delete rent status error due to ' + error;
        response.data = [];
      } else {
        response.data = [];
        response.message = 'Delete rent status success';
        response.status = 200;
      }
    });
  } else {
    response.status = 404;
    response.message = 'Item Id not found';
    response.data = [];
  }
  return response;
};

module.exports = RentStatus;