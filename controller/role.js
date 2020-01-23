const Role = require('../model/role.model');
var response = require('../config/res');

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: 'Content can not be empty!'
    });
  }

  const role = new Role({
    roleId: parseInt(req.body.roleId),
    name: req.body.name,
    description: req.body.description
  });

  var createdRole = Role.create(role);
  if (createdRole.status === 200) {
    response.ok(createdRole.data, res);
  } else {
    res.status(400).send({
      error: true,
      message: createdRole.message
    });
  }
};

exports.findAll = (req, res) => {
  var result = Role.getAll();
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
  var roleId = req.params.id;
  if (!roleId) {
    res.status(400).send({
      error: true,
      message: 'Please provide an id'
    });
  } else {
    var result = Role.getById(roleId);
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
  const role = {
    roleId: parseInt(req.body.roleId),
    name: req.body.name,
    description: req.body.description
  };
  const roleId = req.params.id;
  if (!roleId) {
    res.status(400).send({
      error: true,
      message: 'Please provide an id'
    });
  } else {
    var result = Role.update(roleId, role);
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
  var roleId = req.params.id;
  if (!roleId) {
    res.status(400).send({
      error: true,
      message: 'Please provide an id'
    });
  } else {
    var result = Role.deleteRole(roleId);
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
