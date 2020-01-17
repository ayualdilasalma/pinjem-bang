const Item = require('../model/item.model');

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

  Item.create(item, (err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Some error occured while creating the Item'
      });
    } else {
      res.send(data);
    }
  });
};

exports.findAll = (req, res) => {
  Item.getAll((err, data) => {
    if (err) {
      res.status(500).send({
        message: err.message || 'Error'
      });
    } else {
      res.send(data);
    }
  });
};
