'use strict';

module.exports = function(app) {
  var item = require('../controller/item');
  app.route('/items').get(item.findAll);
  app.route('/items/:id').get(item.findById);
  app.route('/items').post(item.create);
  app.route('/items/:id').put(item.update);
  app.route('/items/:id').delete(item.delete);
};
