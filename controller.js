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
    sql = 'SELECT Users.* FROM Users WHERE Users.UserId = ? AND Users.EndDateTime IS NULL';
    connection.query(sql, [userId] , function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    })
}

exports.createOrUpdateUsers = function(req, res){
    
    let body = [req.body.UserId , req.body.Name, req.body.Email, req.body.Passcode];
    let UserId = req.body.UserId;
    if(UserId == ""){
        body.shift();
        sql = 'INSERT INTO Users (Name, Email, Passcode) VALUES (?); UPDATE Users SET Users.UserId = LAST_INSERT_ID() WHERE Users.id = LAST_INSERT_ID();';
    
        connection.query(sql,[body], function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok("user updated", res)
            }
        })

    } else {
        sql = 'UPDATE Users SET Users.EndDateTime = now() WHERE Users.UserId = ? AND Users.EndDateTime IS NULL; INSERT INTO Users (UserId, Name, Email, Passcode) VALUES (?);';
        
        connection.query(sql, [UserId, body], function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok("user updated", res)
            }
        })
    }
}

exports.deleteUsers = function (req, res){
    let UserId = req.body.UserId;
    sql = 'UPDATE Users SET Users.EndDateTime = now() WHERE Users.UserId = ? AND Users.EndDateTime IS NULL;';

    connection.query(sql, [UserId], function (error, rows, fields){
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