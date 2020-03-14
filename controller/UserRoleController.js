const userRole = require('../model/UserRoles');
const moment = require('moment');

class UserRoleController {
  constructor() {}

  findById(id) {
    return new Promise((resolve, reject) => {
      userRole
        .findOne({
          where: {
            id: id
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
      userRole
        .findAll()
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

  createUserRole(request) {
    const userRoleCreated = role.build({
      RoleId: request.body.RoleId,
      UserId: request.body.UserId
    });

    return new Promise((resolve, reject) => {
      userRoleCreated
        .save()
        .then(data => {
          if (data) {
            userRoleCreated
              .update({
                RoleId: data.RoleId,
                UserId: data.UserId
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

  deleteUserRole(id) {
    return new Promise((resolve, reject) => {
      userRole
      .destroy(
          {
            where: {
              id: id
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

module.exports = UserRoleController;
