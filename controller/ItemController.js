const sequelize = require('sequelize');
const response = require('./ResponseController');
const item = require('../model/Items');
const moment = require('moment');

class ItemController {
  constructor() {}

  findById(id) {
    return new Promise((resolve, reject) => {
      item
        .findOne({
          where: {
            ItemId: id,
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
            message: 'Unable to get item by id',
            status: 400
          });
        });
    });
  }

  findAll() {
    return new Promise((resolve, reject) => {
      item
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
            message: 'Unable to get all items',
            status: 400
          });
        });
    });
  }

  createItem(request) {
    const itemCreated = item.build({
      Name: request.body.name,
      Description: request.body.description,
      OwnerId: parseInt(request.body.ownerId),
      EndDateTime: null
    });

    return new Promise((resolve, reject) => {
      itemCreated
        .save()
        .then(data => {
          if (data) {
            itemCreated
              .update({
                ItemId: data.id
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
            message: 'Unable to save the item',
            status: 400
          });
        });
    });
  }

  updateItem(request) {
    return new Promise((resolve, reject) => {
      const id = request.params.id;
      const updatedItem = item.build({
        ItemId: id,
        Name: request.body.name,
        Description: request.body.description,
        OwnerId: parseInt(request.body.ownerId),
        EndDateTime: null
      });
      item
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
        .then(updatedData => {
          updatedItem
            .save()
            .then(createdItem => {
              resolve({
                status: 200,
                data: createdItem
              });
            })
            .catch(err => {
              return reject({
                status: 400,
                error: err,
                message: 'Failed to create new updated item'
              });
            });
        })
        .catch(err => {
          return reject({
            error: err,
            status: 400,
            message: 'Failed to update item'
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

  deleteItem(id) {
    return new Promise((resolve, reject) => {
      item
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
        .then(data => {
          resolve({
            status: 200,
            message: 'Delete Item Success',
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

module.exports = ItemController;
