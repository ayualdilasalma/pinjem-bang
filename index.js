const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const connection = require('./config/db');
const port = process.env.PORT || 3200;
const itemRoute = require('./routes/items');

// middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

itemRoute(app);
app.get('/', (req, res) => {
  res.send('Hello world, init project');
});

app.use('/', itemRoute);

app.listen(port, () => {
  console.log(`running at port ${port}`);
});
