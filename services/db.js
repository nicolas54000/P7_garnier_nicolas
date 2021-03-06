const mysql = require('mysql');

// Connexion à la base données MySQL locale
const dbConfig = require("../config/db.config.js");


// Create a connection to the database
const db = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database,
  multipleStatements: true

});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
});

exports.db;

// Configuration d'une promesse pour les requêtes SQL
exports.executeSql = (sql, toBind = []) => {
    return new Promise((resolve, reject) => {
        db.query(sql, toBind, (error, data) => {
            if(error) reject(error);
            resolve(data);
        });
    });
};


