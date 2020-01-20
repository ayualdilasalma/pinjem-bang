const Item = require('../model/item.model');
var response = require('../config/res');

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  const item = new Item({
    name: req.body.name,
    description: req.body.description,
    ownerId: req.body.ownerId
  });

  var createdItem = Item.create(item);
  if (createdItem.status === 200) {
    response.ok(createdItem.data, res);
  } else {
    res.status(400).send({
      error: true,
      message: createdItem.message
    });
  }
};

exports.findAll = (req, res) => {
  var result = Item.getAll();
  if (result.status === 200) {
    response.ok(result.data, res);
  } else {
    res.status(400).send({
      error: true,
      message: result.message
    });
  }
};

exports.findById = (req, res) => {
  var itemId = req.params.id;
  if (!itemId) {
    res.status(400).send({
      error: true,
      message: 'Please provide an id'
    });
  } else {
    var result = Item.getById(itemId);
    if (result.status === 200) {
      response.ok(result.data, res);
    } else {
      res.status(400).send({
        error: true,
        message: result.message
      });
    }
  }
};

exports.update = (req, res) => {
  var item = req.body.item;
  var itemId = req.params.id;
  if (!itemId) {
    res.status(400).send({
      error: true,
      message: 'Please provide an id'
    });
  } else {
    var result = Item.update(itemId, item);
    if (result.status === 200) {
      response.ok(result.message, res);
    } else {
      res.status(400).send({
        error: true,
        message: 'Update failed'
      });
    }
  }
};

exports.delete = (req, res) => {
  var itemId = req.params.id;
  if (!itemId) {
    res.status(400).send({
      error: true,
      message: 'Please provide an id'
    });
  } else {
    var result = Item.deleteItem(itemId);
    if (result.status === 200) {
      response.ok(result.message, res);
    } else {
      res.status(400).send({
        error: true,
        message: 'Delete failed due to ' + result.message
      });
    }
  }
};
