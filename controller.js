'use strict';

var response = require('./res');
var connection = require('./config/db');
var sql ='';

exports.getAllUsers = function(req, res){
    connection.query('SELECT * FROM Users', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    })
}

exports.getUsers = function(req, res){
    var userId = req.body.UserId;
    sql = "SELECT Users.* FROM Users WHERE Users.UserId = ? AND Users.EndDateTime IS NULL";
    connection.query(sql, [userId] , function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    })
}

exports.createOrUpdateUsers = function(req, res){
    
    let body = req.body;

    if(body.UserId == ""){
        sql = "INSERT INTO Users (UserId, Name, Email, Passcode, StartDateTime) VALUES (?); UPDATE Users SET Users.UserId = LAST_INSERT_ID() WHERE Users.id = LAST_INSERT_ID();";
    } else {
        sql = "UPDATE Users SET Users.EndDateTime = now() WHERE Users.UserId = ? AND Users.EndDateTime IS NULL; INSERT INTO Users (UserId, Name, Email, Passcode, StartDateTime) VALUES (?);";
    }

    connection.query(sql, [req.body], function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("user updated", res)
        }
    })
}

exports.deleteUsers = function (req, res){
    var userId = req.body.UserId;
    sql = "UPDATE Users SET Users.EndDateTime = now() WHERE Users.UserId = ? AND Users.EndDateTime IS NULL;";

    connection.query(sql, [userId], function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("user deleted", res)
        }
    })
}

exports.index = function(req, res){
    response.ok("JS RESTful side",res);
}