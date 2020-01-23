const RentStatus = require('../model/rentStatus.model');
var response = require('../config/res');

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  const rentStatus = new RentStatus({
    name: req.body.name,
    description: req.body.description
  });

  var createdRentStatus = RentStatus.create(item);
  if (createdRentStatus.status === 200) {
    response.ok(createdRentStatus.data, res);
  } else {
    res.status(400).send({
      error: true,
      message: createdRentStatus.message
    });
  }
};

exports.findAll = (req, res) => {
  var result = RentStatus.getAll();
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
  var statusId = req.params.id;
  if (!statusId) {
    res.status(400).send({
      error: true,
      message: 'Please provide an id'
    });
  } else {
    var result = RentStatus.getById(statusId);
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
  var rentStatus = req.body.status;
  var rentStatusId = req.params.id;
  if (!rentStatusId) {
    res.status(400).send({
      error: true,
      message: 'Please provide an id'
    });
  } else {
    var result = RentStatus.update(rentStatusId, rentStatus);
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
  var rentStatusId = req.params.id;
  if (!rentStatusId) {
    res.status(400).send({
      error: true,
      message: 'Please provide an id'
    });
  } else {
    var result = RentStatus.deleteItem(rentStatusId);
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
