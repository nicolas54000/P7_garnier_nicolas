

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
            let sqlQuery = 'INSERT INTO users (userId, email, password, dateOfCreation, lastname, firstname, isActive, lastLog, isAdmin) '+
            'VALUES (NULL, ?, ?, NOW(), ?, ?, 1, NOW(), false)';
            return db.executeSql(sqlQuery, params);
        }

        allUsers() {
            let sqlQuery = 'SELECT * FROM users';
            return db.executeSql(sqlQuery);
        }

        // recherche par id

        findOneById(userId) {

            let params = [userId];
            let sqlQuery = 'SELECT * FROM users WHERE userId = ?? ';
            return db.executeSql(sqlQuery, params);
        }

        findOne() {
            let params = [this.email]

            let sqlQuery = 'SELECT * FROM users WHERE email = ? ';
            return db.executeSql(sqlQuery, params);
        }



        findOneByEmail(email) {
            let params = [email]
            let sqlQuery = 'SELECT * FROM users WHERE email = ? ';
            return db.executeSql(sqlQuery, params);
        }
        updateUser(userId) {
            let params = [this.firstname, this.lastname, userId]
            let sqlQuery = 'UPDATE Users SET firstname = ?, lastname = ?  WHERE userId = ?';
            return db.executeSql(sqlQuery, params);
        }
        updateUserWPassword(userId) {
            let params = [this.firstname, this.lastname, this.email, this.password, userId]
            let sqlQuery = 'UPDATE Users SET firstname = ?, lastname = ?, email = ?, password = ? WHERE userId = ?';
            return db.executeSql(sqlQuery, params);
        }
        updateUserLog(userId) {
            let params = [userId]
            let sqlQuery = 'UPDATE Users SET lastLog=now() WHERE userId =  ?';
            console.log( sqlQuery);
            return db.executeSql(sqlQuery, params);
        }
        desactivateUser(userId) {
            let params = [userId]
            let sqlQuery = 'UPDATE Users SET isActive=0 WHERE userId = ?';
            return db.executeSql(sqlQuery, params);
        }
}
module.exports = User;