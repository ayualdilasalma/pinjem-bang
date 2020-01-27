'use strict';

module.exports = function(app) {
  var rent = require('../controller/rent');
  app.route('/rents').get(rent.findAll);
  app.route('/rents/:id').get(rent.findById);
  app.route('/rents').post(rent.create);
  app.route('/rents/:id').put(rent.update);
  app.route('/rents/:id').delete(rent.delete);
};
