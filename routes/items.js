'use strict';
const ItemController = require('../controller/ItemController');

module.exports = function(app) {
  var item = require('../controller/item');
  var itemCont = new ItemController();
  app.route('/items').get((req, res) =>
    itemCont
      .findAll()
      .then(data => res.send(data))
      .catch(err => res.send(err))
  );
  app.route('/items/:id').get((req, res) => {
    const id = req.params.id;
    itemCont
      .findById(id)
      .then(data => res.send(data))
      .catch(err => res.status(400).send('Error occured due to ' + err));
  });
  app.route('/items').post((req, res) => {
    itemCont
      .createItem(req)
      .then(data => res.send(data))
      .catch(err => res.send(err));
  });
  app.route('/items/:id').put((req, res) => {
    itemCont
      .updateItem(req)
      .then(data => res.data(data))
      .catch(err => res.send(err));
  });
  app.route('/items/:id').delete((req, res) => {
    const id = req.params.id;
    itemCont
      .deleteItem(id)
      .then(data => res.send(data))
      .catch(err => res.send(err));
  });
};
