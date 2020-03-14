'use strict';
const UserController = require('../controller/UserController');

module.exports = function(app) {
  var user = require('../controller/user');
  var userConstructor = new UserController();

  app.route('/users').get((req, res) => {
    userConstructor
      .findAll()
      .then(data => res.send(data))
      .catch(err => res.send(err));
  });
  app.route('/users/:id').get((req, res) => {
    const id = req.params.id;
    userConstructor
      .findUserById(id)
      .then(data => res.send(data))
      .catch(err => res.send(err));
  });
  app.route('/users').post((req, res) => {
    userConstructor
      .createUser(req)
      .then(data => res.send(data))
      .catch(err => res.send(err));
  });
  app.route('/users/:id').put((req, res) => {
    userConstructor
      .updateUser(req)
      .then(data => res.send(data))
      .catch(err => res.send(err));
  });
  app.route('/users/:id').delete((req, res) => {
    const id = req.params.id;

    userConstructor
      .deleteUser(id)
      .then(data => res.send(data))
      .catch(err => res.send(err));
  });
};
