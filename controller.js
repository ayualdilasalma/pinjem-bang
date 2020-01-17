'use strict';

var response = require('./res');
var connection = require('./config/db');
var sql ='';

//USER CRUD
//USER Get All
exports.getAllUsers = function(req, res){
    connection.query('SELECT * FROM Users WHERE Users.EndDateTime ISNULL', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    })
}

//USER GetById
exports.getUsers = function(req, res){
    var userId = req.params.UserId;
    sql = 'SELECT Users.* FROM Users WHERE Users.UserId = ? AND Users.EndDateTime IS NULL';
    connection.query(sql, [userId] , function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    })
}

//USER Create or Update
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
                response.ok("user created", res)
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

//USER Delete
exports.deleteUsers = function (req, res){
    let UserId = req.params.UserId;
    sql = 'UPDATE Users SET Users.EndDateTime = now() WHERE Users.UserId = ? AND Users.EndDateTime IS NULL;';

    connection.query(sql, [UserId], function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("user deleted", res)
        }
    })
}


//ROLES CRUD
//Roles Get All
exports.getAllRoles = function(req, res){
    connection.query('SELECT * FROM Roles WHERE Users.EndDateTime ISNULL', function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    })
}

//Role GetById
exports.getRoles = function(req, res){
    var userId = req.params.UserId;
    sql = 'SELECT Roles.* FROM Users WHERE Roles.RoleId = ? AND Roles.EndDateTime IS NULL';
    connection.query(sql, [userId] , function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok(rows, res)
        }
    })
}

//Role Create or Update
exports.createOrUpdateRoles = function(req, res){
    
    let body = [req.body.UserId , req.body.Name, req.body.Description];
    let RoleId = req.body.UserId;
    if(RoleId == ""){
        body.shift();
        sql = 'INSERT INTO Roles (Name, Description) VALUES (?); UPDATE Users SET Users.UserId = LAST_INSERT_ID() WHERE Roles.id = LAST_INSERT_ID();';
    
        connection.query(sql,[body], function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok("role created", res)
            }
        })

    } else {
        sql = 'UPDATE Roles SET Roles.EndDateTime = now() WHERE Roles.RoleId = ? AND Roles.EndDateTime IS NULL; INSERT INTO Roles (RoleId, Name, Description) VALUES (?);';
        
        connection.query(sql, [RoleId, body], function (error, rows, fields){
            if(error){
                console.log(error)
            } else{
                response.ok("role updated", res)
            }
        })
    }
}

//ROLE Delete
exports.deleteRoles = function (req, res){
    let RoleId = req.params.UserId;
    sql = 'UPDATE Roles SET Roles.EndDateTime = now() WHERE Roles.RolesId = ? AND Roles.EndDateTime IS NULL;';

    connection.query(sql, [UserId], function (error, rows, fields){
        if(error){
            console.log(error)
        } else{
            response.ok("role deleted", res)
        }
    })
}

exports.index = function(req, res){
    response.ok("JS RESTful side",res);
}