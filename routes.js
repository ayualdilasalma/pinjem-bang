'use strict';

module.exports = function(app) {
    var todoList = require('./controller');

    app.route('/')
        .get(todoList.index);

    app.route('/users')
        .get(todoList.getAllUsers);

    app.route('/users/:UserId')
        .get(todoList.getUsers);
    
    app.route('/users')
        .post(todoList.createOrUpdateUsers);

    app.route('/users/:UserId')
        .delete(todoList.deleteUsers);
};