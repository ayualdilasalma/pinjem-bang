'use strict';
var itemRoute = require('./items');
var rentStatus = require('./rentStatus');
var userRoute = require('./users');
var roleRoute = require('./roles');
var rentRoute = require('./rents');

module.exports = function(app) {
  itemRoute(app);
  rentStatus(app);
  userRoute(app);
  roleRoute(app);
  rentRoute(app);
};
