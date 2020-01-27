const Rent = require('../model/rent.model');
var response = require('../config/res');

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  const rent = {
    customerId: parseInt(req.body.customerId),
    itemId: parseInt(req.body.itemId),
    rentStatusId: parseInt(req.body.rentStatusId)
  };

  //console.log(rent);
  var createdRent = Rent.create(rent);
  if (createdRent.status === 200) {
    response.ok(createdRent.data, res);
  } else {
    res.status(400).send({
      error: true,
      message: createdRent.message
    });
  }
};

exports.findAll = (req, res) => {
  var result = Rent.getAll();
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
  var rentId = req.params.id;
  if (!rentId) {
    res.status(400).send({
      error: true,
      message: 'Please provide an id'
    });
  } else {
    var result = Rent.getById(rentId);
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
  const rent = {
    rentId: parseInt(req.body.rentId),
    customerId: parseInt(req.body.customerId),
    itemId: parseInt(req.body.itemId),
    rentStatusId: parseInt(req.body.rentStatusId)
  };
  var rentId = req.params.id;
  if (!rentId) {
    res.status(400).send({
      error: true,
      message: 'Please provide an id'
    });
  } else {
    var result = Rent.update(rentId, rent);
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
  var rentId = req.params.id;
  if (!rentId) {
    res.status(400).send({
      error: true,
      message: 'Please provide an id'
    });
  } else {
    var result = Rent.deleteRent(rentId);
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
