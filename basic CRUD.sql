-- USER
-- get Data
SELECT Users.*
FROM Users
WHERE Users.UserId = '?'
AND Users.EndDateTime IS NULL;

-- create Data
INSERT INTO Users (Name, Email, Passcode, StartDateTime)
VALUES (?);

UPDATE Users
SET Users.UserId = LAST_INSERT_ID()
WHERE Users.id = LAST_INSERT_ID();

-- update Data -- will need multiple placeholder when doing query, one for id, others for data.
UPDATE Users
SET Users.EndDateTime = now()
WHERE Users.UserId = '?'
AND Users.EndDateTime IS NULL;

INSERT INTO Users (UserId, Name, Email, Passcode, StartDateTime)
VALUES (?);

-- delete data
UPDATE Users
SET Users.EndDateTime = now()
WHERE Users.UserId = '?'
AND Users.EndDateTime IS NULL;

-- ROLES
-- get Data
SELECT Roles.*
FROM Roles
WHERE Roles.RoleId = '?'
AND Roles.EndDateTime IS NULL;

-- create Data
INSERT INTO Roles (Name, Description, StartDateTime)
VALUES (?);

UPDATE Roles
SET Roles.RoleId = LAST_INSERT_ID()
WHERE Roles.id = LAST_INSERT_ID();

-- update Data -- will need multiple placeholder when doing query, one for id, others for data.
UPDATE Roles
SET Roles.EndDateTime = now()
WHERE Roles.RoleId = '?'
AND Roles.EndDateTime IS NULL;

INSERT INTO Roles (RoleId, Name, Description, StartDateTime)
VALUES (?);

-- delete data
UPDATE Roles
SET Roles.EndDateTime = now()
WHERE Roles.RoleId = '?'
AND Roles.EndDateTime IS NULL;

-- change now() with currentDate get by momentJS format