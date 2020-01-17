module.exports = app => {
  const item = require('../controller/item');

  app.post('/items', item.create);

  app.get('/items', item.findAll);
};
