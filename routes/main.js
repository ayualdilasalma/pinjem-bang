'use strict';
var itemRoute = require('./items');
var rentStatus = require('./rentStatus');
var userRoute = require('./users');
var roleRoute = require('./roles');

module.exports = function(app) {
  itemRoute(app);
  rentStatus(app);
  userRoute(app);
  roleRoute(app);
};
