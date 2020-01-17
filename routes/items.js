'use strict';

module.exports = function(app) {
  var item = require('../model/item.model');
  app.route('/items').get(item.getAll);
};
