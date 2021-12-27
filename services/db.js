const mysql = require('mysql');

// Connexion à la base données MySQL locale
const dbConfig = require("../config/db.config.js");


// Create a connection to the database
const db = mysql.createConnection({
  host: dbConfig.host,
  user: dbConfig.user,
  password: dbConfig.password,
  database: dbConfig.database
});

db.connect(function(err) {
    if (err) throw err;
    console.log("Connecté à la base de données MySQL!");
});

exports.db;

// Configuration d'une promesse pour les requêtes SQL
exports.executeSql = (sql) => {
    return new Promise((resolve, reject) => {
        db.query(sql, (error, data) => {
            if(error) reject(error);
            resolve(data);
        });
    });
};


//  mise en forme de la requete
// ajout parametres

exports.preparer = function(mysql, sqlQuery, params) {
    sqlQuery = mysql.format(sqlQuery, params)
   .replace(/`/g, "'")
   .replace(/'\.'/g, ".")
    return sqlQuery
}