const db = require('../config/db');

// constructor
const Item = function(item) {
  this.itemId = item.itemId;
  this.ownerId = item.ownerId;
  this.name = item.name;
  this.description = item.description;
};

var queryResult = {
  status: undefined,
  message: '',
  data: []
};

Item.create = newItem => {
  var query = 'INSERT INTO Items (ownerId, name, description) VALUES (?);';
  query =
    query +
    'UPDATE Items SET Items.itemId = LAST_INSERT_ID() Items.id = LAST_INSERT_ID()';
  db.query(query, newItem, (err, res) => {
    if (err) {
      queryResult.status = 400;
      queryResult.message = 'Error occured while creating item due to ' + err;
      queryResult.data = [];
    } else {
      queryResult.status = 200;
      queryResult.message = 'Create Item success';
      queryResult.data = res;
    }

    return queryResult;
  });
};

Item.update = (id, item) => {
  var dataById = this.getById(id);
  if (dataById.status === 200) {
    var query =
      'UPDATE Items SET Items.EndDateTime = now() WHERE Items.ItemId = ? AND Items.EndDateTime IS NULL; INSERT INTO Items (ItemId, OwnerId, Name, Description) VALUES (?);';

    db.query(query, [id, item], function(error, rows, fields) {
      if (error) {
        queryResult.status = 400;
        queryResult.message = 'Update item failed';
      } else {
        queryResult.status = 200;
        queryResult.message = 'Update item success';
      }
    });
  }
  return queryResult;
};

Item.getAll = () => {
  db.query('SELECT * FROM Items', (err, row, fields) => {
    if (err) {
      queryResult.data = [];
      queryResult.message = 'Fetch items failed';
      queryResult.status = 400;
    }
    queryResult.data = row;
    queryResult.status = 200;
    queryResult.message = 'Fetch items success';
  });

  return queryResult;
};

Item.getById = function(id) {
  var query =
    'SELECT Items.* FROM Items WHERE Items.ItemId = ? AND Items.EndDateTime IS NULL';
  db.query(query, id, function(error, rows, field) {
    if (error) {
      (queryResult.status = 400), (queryResult.data = []);
    } else {
      (queryResult.status = 200), (queryResult.data = rows);
    }
  });
  return queryResult;
};

Item.deleteItem = function(id) {
  var dataFetch = this.getById(id);
  if (dataFetch.status === 200) {
    var query =
      'UPDATE Items SET Items.EndDateTime = now() WHERE Items.ItemId = ? AND Items.EndDateTime IS NULL';
    db.query(query, id, function(error, rows, field) {
      if (error) {
        queryResult.status = 401;
        queryResult.message = 'Delete item error due to ' + error;
        queryResult.data = [];
      } else {
        (queryResult.data = []),
          (queryResult.message = 'Delete item success'),
          (queryResult.status = 200);
      }
    });
  } else {
    queryResult.status = 404;
    queryResult.message = 'Item Id not found';
    queryResult.data = [];
  }
  return queryResult;
};

module.exports = Item;
