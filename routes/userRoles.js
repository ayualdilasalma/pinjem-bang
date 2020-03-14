'use strict';
const UserRoleController = require('../controller/UserRoleController');

module.exports = function(app) {
    var userRoleCont = new UserRoleController();
    app.route('/userroles').get((req, res)=>
        userRoleCont
            .findAll()
            .then(data => res.send(data))
            .catch(err => res.send(err))
    );
    app.route('/userroles/:id').get((req, res)=> {
        const id = req.params.id;
        userRoleCont
            .findById(id)
            .then(data => res.send(data))
            .catch(err => res.status(400).send('Error occured due to ' + err))
    });
    app.route('/userroles').post((req, res)=>
        userRoleCont
            .createUserRole(req)
            .then(data => res.send(data))
            .catch(err => res.send(err))
    );
    app.route('/userroles/:id').delete((req, res)=> {
        const id = req.params.id;
        RoleCont
          .deleteUserRole(id)
          .then(data => res.send(data))
          .catch(err => res.send(err));
    });
};