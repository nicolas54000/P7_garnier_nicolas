const db = require('../services/db')
const mysql = require('mysql');

class Article {
        idArticle = null;
        title = '';
        userId = null;
        dateOfCreationA = null;
        dateOfModificationA = null;
        theme = 1;


        constructor(data = null) {
            if(data != null) {
                if(data.title) this.title = data.title;
                if(data.userId) this.userId = data.userId;
                if(data.theme) this.theme = data.theme;



            }
        };

        addArticle() {
            let params = [this.title, this.userId, this.theme];
            let sqlQuery = 'INSERT INTO Articles (idArticle, title, userId, dateOfCreation, dateOfModification, fk_theme)' +
            ' VALUES (NULL, ?, ?, NOW(), NOW(), ?)';
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery)

        };

// id = nombre de lignes
        getAllArticle(id) {
            let params =  [id];
            let sqlQuery =
            `WITH toto AS (
                SELECT content, idArticle,commentId, MIN(dateOfCreation) dateOfCreation FROM comments
                GROUP BY idArticle
                )
                SELECT * FROM articles a
                JOIN toto c ON a.idArticle = c.idArticle
                JOIN users ON users.userId = a.userId
                JOIN themes t ON a.fk_Theme = t.idThemes
                ORDER BY dateOfModificationA DESC LIMIT 5`;



            //db.query(sqlQuery, [this.nombre], (err, res) => {//traitement du résultat});
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery);
        };
        getOneArticle(id) {
            let params = [id]
            let sqlQuery = `SELECT articles.idArticle, articles.title, articles.dateOfModification, users.userId, users.firstname
            AS firstname, users.lastname AS lastname FROM Articles
            INNER JOIN Users ON articles.userId = users.userId
            WHERE idArticle = ?
            ORDER BY dateOfModification DESC`;
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery);
        };
        updateArticle(id) {
            let params = [this.title, id];
            let sqlQuery = `UPDATE Articles SET title = ??, dateOfModification=NOW() WHERE idArticle = ?`;
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery);
        };
        deleteOneArticle(id) {
            let params = [id]
            let sqlQuery = `DELETE FROM Articles WHERE idArticle = ?`;
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery);
        };


        getThemes() {
            let params =  [];
            let sqlQuery =
            `SELECT * FROM projet7.themes`;

            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery);
        };
}
module.exports = Article;