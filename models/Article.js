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
            return db.executeSql(sqlQuery, params);

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
            return db.executeSql(sqlQuery, params);
        };
        getOneArticle(id) {
            let params = [id]
            let sqlQuery = `SELECT articles.idArticle, articles.title, articles.dateOfModification, users.userId, users.firstname
            AS firstname, users.lastname AS lastname FROM Articles
            INNER JOIN Users ON articles.userId = users.userId
            WHERE idArticle = ?
            ORDER BY dateOfModification DESC`;
            return db.executeSql(sqlQuery, params);
        };
        updateArticle(id) {
            let params = [this.title, id];
            let sqlQuery = `UPDATE Articles SET title = ?, dateOfModification=NOW() WHERE idArticle = ?`;
            return db.executeSql(sqlQuery, params);
        };
        deleteOneArticle(id) {
            let params = [id]
            let sqlQuery = `DELETE FROM Articles WHERE idArticle = ?`;
            return db.executeSql(sqlQuery, params);
        };

        Articletheme(id) {
            let params = [id];
            let sqlQuery = `WITH toto AS (
                SELECT content, idArticle,commentId, MIN(dateOfCreation) dateOfCreation FROM comments
                GROUP BY idArticle
                )
                SELECT * FROM articles a
                JOIN toto c ON a.idArticle = c.idArticle
                JOIN users ON users.userId = a.userId
                JOIN themes t ON a.fk_Theme = t.idThemes
                where a.fk_theme = ?
                ORDER BY dateOfModificationA DESC LIMIT 5 `;

            return db.executeSql(sqlQuery, params);
        };
//
}
module.exports = Article;