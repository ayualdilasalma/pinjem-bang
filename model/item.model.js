const sql = require('../config/db');
var response = require('../config/res');

// constructor
const Item = function(item) {
  this.itemId = item.itemId;
  this.ownerId = item.ownerId;
  this.name = item.name;
  this.description = item.description;
};

Item.create = (newItem, result) => {
  sql.query('INSERT INTO Items SET ?', newItem, (err, res) => {
    if (err) {
      console.log('error ', err);
      result(err, null);
      return;
    }

    console.log('crated item: ', { id: res.insertId, ...newItem });
    result(null, { id: res.insertId, ...newItem });
  });
};

Item.getAll = (req, res) => {
  sql.query('SELECT * FROM Items', (err, row, fields) => {
    if (err) {
      console.log('error: ' + err);
      result(null, err);
      return;
    }
    response.ok(row, res);
  });
};

module.exports = Item;
