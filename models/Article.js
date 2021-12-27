const db = require('../services/db')
const mysql = require('mysql');

class Article {
        idArticle = null;
        title = '';
        content = '';
        imageUrl = '';
        isGif = null;
        userId = null;
        dateOfCreation = null;
        dateOfModification = null;
        likes = 0;
        dislikes = 0;

        constructor(data = null) {
            if(data != null) {
                if(data.title) this.title = data.title;
                if(data.content) this.content = data.content;
                if(data.imageUrl) this.imageUrl = data.imageUrl;
                if(data.isGif) this.isGif = data.isGif;
                if(data.userId) this.userId = data.userId;
            }
        };

        addArticle() {
            let params = [this.title, this.content, this.imageUrl, this.isGif, this.userId, this.likes, this.dislikes];
            let sqlQuery = 'INSERT INTO Articles (idArticle, title, content, imageUrl, isGif, userId, dateOfCreation, dateOfModification, likes, dislikes)' +
            ' VALUES (NULL, ??, ??, ??, ?, ?, NOW(), NOW(), ?, ?)';
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery)

        };
        getAllArticle(nbOfArticle) {
            let params = [nbOfArticle]
            let sqlQuery = `SELECT articles.idArticle, articles.title, articles.content,
            articles.imageUrl, articles.isGif, articles.dateOfModification, users.userId, users.firstname
            AS firstname, users.lastname AS lastname FROM Articles
            INNER JOIN Users ON articles.userId = users.userId
            ORDER BY dateOfModification DESC LIMIT ?`;
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery);
        };
        getOneArticle(id) {
            let params = [id]
            let sqlQuery = `SELECT articles.idArticle, articles.title, articles.content,
            articles.imageUrl, articles.isGif, articles.dateOfModification, users.userId, users.firstname
            AS firstname, users.lastname AS lastname FROM Articles
            INNER JOIN Users ON articles.userId = users.userId
            WHERE idArticle = ?
            ORDER BY dateOfModification DESC`;
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery);
        };
        updateArticle(id) {
            let params = [this.title, this.content, this.imageUrl, this.isGif, this.userId, id];
            let sqlQuery = `UPDATE Articles SET title = ??, imageUrl = ??, content = ??,dateOfModification=NOW() WHERE idArticle = ?`;
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery);
        };
        deleteOneArticle(id) {
            let params = [id]
            let sqlQuery = `DELETE FROM Articles WHERE idArticle = ?`;
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery);
        };
}
module.exports = Article;