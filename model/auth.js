const db = require("../config/db");
const bcrypt = require('bcrypt');

const Auth = function(auth) {
  this.email = auth.email;
  this.passcode = auth.passcode;
};

Auth.authenticate = newAuth => {
  var query =
    "SELECT * FROM Users WHERE username = ? AND password = ? AND Users.EndDateTime IS NULL";

  var username = request.body.username;
  var passcode = request.body.passcode;
  if (username && password) {
    bcrypt.compare(passcode, hash).then(function(res) {
      db.query(query, [username, hash], function(error, results, fields) {
        if (results.length > 0 && res) {
        //   request.session.loggedin = true;
        //   request.session.username = username;
        //   response.redirect("/home");
        } else {
        //   response.send("Incorrect Username and/or Password!");
        }
        // response.end();
      });
    });
  } else {
    // response.send("Please enter Username and Password!");
    // response.end();
  }
};
