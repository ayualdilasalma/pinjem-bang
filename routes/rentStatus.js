'use strict';

module.exports = function(app) {
  var status = require('../controller/rentStatus');
  app.route('/status').get(status.findAll);
  app.route('/status/:id').get(status.findById);
  app.route('/status').post(status.create);
  app.route('/status/:id').put(status.update);
  app.route('/status/:id').delete(status.delete);
};
