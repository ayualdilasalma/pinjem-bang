const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const connection = require('./config/db');
const port = process.env.PORT || 3200;

// middleware
/*app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false })); */

app.get('/', (req, res) => {
  connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }

    console.log('connected as id ' + connection.threadId);
  });
  var result = connection.query('SELECT * FROM RentStatuses', function(
    error,
    rows,
    fields
  ) {
    if (error) {
      console.log(error);
    } else {
      console.log(rows);
    }
  });
  res.send('Hello world, init project');
});

app.listen(port, () => {
  console.log(`running at port ${port}`);
});
