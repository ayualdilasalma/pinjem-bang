const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const connection = require('./config/db');
const routes = require('./routes');
const controller = require('./controller');
const port = process.env.PORT || 3200;

// middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

routes (app)

app.get('/', (req, res) => {
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
  
    console.log('connected as id ' + connection.threadId);
  });
  res.send('Hello world, init project');
});

app.listen(port, () => {
  console.log(`running at port ${port}`);
});
