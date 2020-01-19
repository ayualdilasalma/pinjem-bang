'use strict';
var itemRoute = require('./items');

module.exports = function(app) {
  itemRoute(app);
};
