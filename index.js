const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const connection = require('./config/db');
const port = process.env.PORT || 3200;
const mainRoute = require('./routes/main');

// middleware
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false }));

mainRoute(app);
app.get('/', (req, res) => {
  res.send('Hello world, init project');
});

app.listen(port, () => {
  console.log(`running at port ${port}`);
});
