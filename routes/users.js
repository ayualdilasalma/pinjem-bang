'use strict';

module.exports = function(app) {
    var user = require('../controller/user');
    app.route('/users').get(user.findAll);
    app.route('/users/:id').get(user.findById);
    app.route('/users').post(user.create);
    app.route('/users/:id').put(user.update);
    app.route('/users/:id').delete(user.delete);
};