const User = require('../model/Users');
const moment = require('moment');

class UserController {
  constructor() {}

  findUserById(id) {
    return new Promise((resolve, reject) => {
      User.findOne({
        where: {
          UserId: id,
          EndDateTime: null
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
            message: 'Unable to get user by id',
            status: 400
          });
        });
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      User.findAll({
        where: {
          EndDateTime: null
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
            message: 'Unable to get all users',
            status: 400
          });
        });
    });
  }

  createUser(request) {
    const userCreate = User.build({
      Name: request.body.name,
      Email: request.body.email,
      Password: request.body.password,
      EndDateTime: null
    });

    return new Promise((resolve, reject) => {
      userCreate
        .save()
        .then(data => {
          if (data) {
            userCreate
              .update({
                UserId: data.id
              })
              .then(updatedUser => {
                resolve({
                  status: 200,
                  data: updatedUser
                });
              });
          }
        })
        .catch(error => {
          return reject({
            error: error,
            message: 'Unable to save the user due to ' + error,
            status: 400
          });
        });
    });
  }

  updateUser(request) {
    const id = request.params.id;
    const userCreate = User.build({
      UserId: id,
      Name: request.body.name,
      Email: request.body.email,
      Password: request.body.password,
      EndDateTime: null
    });

    return new Promise((resolve, reject) => {
      User.update(
        {
          EndDateTime: moment.now()
        },
        {
          where: {
            UserId: id,
            EndDateTime: null
          }
        }
      )
        .then(updatedUser => {
          userCreate
            .save()
            .then(savedUser => {
              resolve({
                status: 200,
                data: savedUser
              });
            })
            .catch(error => {
              return reject({
                status: 400,
                error: error,
                message: 'Failed to create new updated user'
              });
            });
        })
        .catch(error => {
          return reject({
            error: error,
            status: 400,
            message: 'Failed to update user'
          });
        });
    }).catch(error => {
      return reject({
        error: error,
        status: 400,
        message: 'Failed to set end date time'
      });
    });
  }

  deleteUser(id) {
    return new Promise((resolve, reject) => {
      User.update(
        {
          EndDateTime: moment.now()
        },
        {
          where: {
            UserId: id,
            EndDateTime: null
          }
        }
      )
        .then(data => {
          resolve({
            status: 200,
            message: 'Delete user success',
            data: data
          });
        })
        .catch(error => {
          return reject({
            error: error,
            message: 'Fail to delete user'
          });
        });
    });
  }
}

module.exports = UserController;
