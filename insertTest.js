const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const connection = require('./config/db');
const port = process.env.PORT || 3200;
const moment = require('moment');

// middleware
/*app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: false })); */

app.get('/', (req, res) => {
  
    connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    let createdId = '';
    let curDate = moment(new Date()).format("YYYY-MM-DD HH:mm:ss");
    
    //create first data
    let sql = "INSERT INTO Users (Name, Email, Passcode, StartDateTime) VALUES (?); UPDATE Users SET UserId = LAST_INSERT_ID() WHERE id = LAST_INSERT_ID();";
    let values = ['obet', 'ote@mail.com', 'cicacode', now()];

    connection.query(sql, [values], function(err,result){
        if (err) throw err;
        //get 
        createdId = result.insertId;
    })

    console.log('success query');
  });
  res.send('Testing Query, Check your Database');
});

app.listen(port, () => {
  console.log(`running at port ${port}`);
});