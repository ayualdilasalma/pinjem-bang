const User = require('../model/user.model');
var response = require('../config/res');

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    passcode: req.body.passcode
  });

  var createdUser = User.create(user);
  if (createdUser.status === 200) {
    response.ok(createdUser.data, res);
  } else {
    res.status(400).send({
      error: true,
      message: createdUser.message
    });
  }
};

exports.findAll = (req, res) => {
  var result = User.getAll();
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
  var userId = req.params.id;
  if (!userId) {
    res.status(400).send({
      error: true,
      message: 'Please provide an id'
    });
  } else {
    var result = User.getById(userId);
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
  const user = {
    userId: req.body.userId,
    name: req.body.name,
    email: req.body.email,
    passcode: req.body.passcode
  };

  const userId = req.params.id;
  if (!userId) {
    res.status(400).send({
      error: true,
      message: 'Please provide an id'
    });
  } else {
    var result = User.update(userId, user);
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
  var userId = req.params.id;
  if (!userId) {
    res.status(400).send({
      error: true,
      message: 'Please provide an id'
    });
  } else {
    var result = User.deleteUser(userId);
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
