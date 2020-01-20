'use strict';
var itemRoute = require('./items');
var userRoute = require('./users');
var roleRoute = require('./roles');

module.exports = function(app) {
  itemRoute(app);
  userRoute(app);
  roleRoute(app);
};
