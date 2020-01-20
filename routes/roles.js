'use strict';

module.exports = function(app) {
    var role = require('../controller/role');
    app.route('/roles').get(role.findAll);
    app.route('/roles/:id').get(role.findById);
    app.route('/roles').post(role.create);
    app.route('/roles/:id').put(role.update);
    app.route('/roles/:id').delete(role.delete);
};