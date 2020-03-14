const role = require('../model/Roles');
const moment = require('moment');

class RoleController {
  constructor() {}

  findById(id) {
    return new Promise((resolve, reject) => {
      role
        .findOne({
          where: {
            RoleId: id,
            endDateTime: null
          }
        })
        .then(data => {
          resolve({
            status: 200,
            data: data
          });
        })
        .catch(error => {
          return reject({
            error: error,
            message: 'Unable to get role by id',
            status: 400
          });
        });
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      role
        .findAll({
          where: {
            endDateTime: null
          }
        })
        .then(data => {
          resolve({
            status: 200,
            data: data
          });
        })
        .catch(error => {
          return reject({
            error: error,
            message: 'Unable to get all roles',
            status: 400
          });
        });
    });
  }

  createRole(request) {
    const roleCreated = role.build({
      Name: request.body.name,
      Description: request.body.description,
      EndDateTime: null
    });

    return new Promise((resolve, reject) => {
      roleCreated
        .save()
        .then(data => {
          if (data) {
            roleCreated
              .update({
                RoleId: data.id
              })
              .then(updatedData => {
                resolve({
                  status: 200,
                  data: updatedData
                });
              });
          }
        })
        .catch(error => {
          return reject({
            error: error,
            message: 'Unable to save the role',
            status: 400
          });
        });
    });
  }

  updateRole(request) {
    return new Promise((resolve, reject) => {
      const id = request.params.id;
      const updatedRole = role.build({
        RoleId: id,
        Name: request.body.name,
        Description: request.body.description,
        EndDateTime: null
      });
      role
        .update(
          {
            EndDateTime: moment.now()
          },
          {
            where: {
              ItemId: id,
              EndDateTime: null
            }
          }
        )
        .then(updatedRole => {
          updatedRole
            .save()
            .then(createdRole => {
              resolve({
                status: 200,
                data: createdRole
              });
            })
            .catch(err => {
              return reject({
                status: 400,
                error: err,
                message: 'Failed to create new updated role'
              });
            });
        })
        .catch(err => {
          return reject({
            error: err,
            status: 400,
            message: 'Failed to update role'
          });
        });
    }).catch(err => {
      return reject({
        error: err,
        status: 400,
        message: 'Failed to set end date time'
      });
    });
  }

  deleteRole(id) {
    return new Promise((resolve, reject) => {
      role
        .update(
          {
            EndDateTime: moment.now()
          },
          {
            where: {
              RoleId: id,
              EndDateTime: null
            }
          }
        )
        .then(data => {
          resolve({
            status: 200,
            message: 'Delete Role Success',
            data: data
          });
        })
        .catch(err => {
          return reject({
            error: err,
            message: 'Failed to delete'
          });
        });
    });
  }
}

module.exports = RoleController;
