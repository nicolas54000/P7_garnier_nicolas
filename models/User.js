

const db = require('../services/db')
const mysql = require('mysql');

class User {
        userId = null;
        email = '';
        password = '';
        dateOfCreation = '';
        lastname = '';
        firstname = '';
        isActive = 1;
        lastLog = 0;
        fk_roles = 1;

        constructor(data = null) {
            if(data != null) {
                if(data.email) this.email = data.email;
                if(data.password) this.password = data.password;
                if(data.lastname) this.lastname = data.lastname;
                if(data.firstname) this.firstname = data.firstname;
                if(data.lastLog) this.lastLog = data.lastLog;
                if(data.fk_roles) this.fk_roles = data.fk_roles;
            }
        };

        //  ajout user

        addUser() {
            let params = [this.email, this.password, this.lastname, this.firstname, this.lastLog]
            let sqlQuery = 'INSERT INTO users (userId, email, password, dateOfCreation, lastname, firstname, isActive, lastLog, fk_roles) '+
            'VALUES (NULL, ??, ??, NOW(), ??, ??, 1, NOW(), 1)';
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery);
        }

        allUsers() {
            let sqlQuery = 'SELECT * FROM users';
            return db.executeSql(sqlQuery);
        }

        // recherche par id

        findOneById(userId) {

            let params = [userId];
            let sqlQuery = 'SELECT * FROM users WHERE userId = ?? ';
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery);
        }

        findOne() {
            let params = [this.email]

            let sqlQuery = 'SELECT * FROM users WHERE email = ?? ';
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery);
        }



        findOneByEmail(email) {
            let params = [email]
            let sqlQuery = 'SELECT * FROM users WHERE email = ?? ';
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery);
        }
        updateUser(userId) {
            let params = [this.firstname, this.lastname, userId]
            let sqlQuery = 'UPDATE Users SET firstname=??, lastname=??  WHERE userId = ?';
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery);
        }
        updateUserWPassword(userId) {
            let params = [this.firstname, this.lastname, this.email, this.password, userId]
            let sqlQuery = 'UPDATE Users SET firstname=??, lastname=??, email=??, password=?? WHERE userId = ?';
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery);
        }
        updateUserLog(userId) {
            let params = [userId]
            let sqlQuery = 'UPDATE Users SET lastLog=now() WHERE userId =  ?';
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            console.log( sqlQuery);
            return db.executeSql(sqlQuery);
        }
        desactivateUser(userId) {
            let params = [userId]
            let sqlQuery = 'UPDATE Users SET isActive=0 WHERE userId = ?';
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery);
        }
}
module.exports = User;