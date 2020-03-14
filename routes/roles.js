'use strict';
const RoleController = require('../controller/RoleController');

module.exports = function(app) {
    var roleCont = new RoleController();
    app.route('/roles').get((req, res)=>
        roleCont
            .findAll()
            .then(data => res.send(data))
            .catch(err => res.send(err))
    );
    app.route('/roles/:id').get((req, res)=> {
        const id = req.params.id;
        roleCont
            .findById(id)
            .then(data => res.send(data))
            .catch(err => res.status(400).send('Error occured due to ' + err))
    });
    app.route('/roles').post((req, res)=>
        roleCont
            .createRole(req)
            .then(data => res.send(data))
            .catch(err => res.send(err))
    );
    app.route('/roles/:id').put((req, res)=>
        roleCont
            .updateRole(req)
            .then(data => res.data(data))
            .catch(err => res.send(err))
    );
    app.route('/roles/:id').delete((req, res)=> {
        const id = req.params.id;
        RoleCont
          .deleteRole(id)
          .then(data => res.send(data))
          .catch(err => res.send(err));
    });
};