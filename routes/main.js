'use strict';
var itemRoute = require('./items');
var rentStatus = require('./rentStatus');

module.exports = function(app) {
  itemRoute(app);
  rentStatus(app);
};
