'use strict';

module.exports = function(app) {
    var todoList = require('./controller');

    app.route('/')
        .get(todoList.index);

    // USER CRUD
    app.route('/users')
        .get(todoList.getAllUsers);

    app.route('/users/:UserId')
        .get(todoList.getUsers);
    
    app.route('/users')
        .post(todoList.createOrUpdateUsers);

    app.route('/users/:UserId')
        .delete(todoList.deleteUsers);

    //ROLE CRUD
    app.route('/roles')
        .get(todoList.getAllRoles);

    app.route('/roles/:RoleId')
        .get(todoList.getRoles);
    
    app.route('/roles')
        .post(todoList.createOrUpdateRoles);

    app.route('/roles/:RoleId')
        .delete(todoList.deleteRoles);
};