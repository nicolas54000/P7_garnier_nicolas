const db = require('../services/db')
const mysql = require('mysql');

class Article {
        idArticle = null;
        title = '';
        userId = null;
        dateOfCreationA = null;
        dateOfModificationA = null;
        theme = 1;
        commentaire = "";

        nbrligne = null;
        noligne = null;


        constructor(data = null) {
            if(data != null) {
                if(data.title) this.title = data.title;
                if(data.userId) this.userId = data.userId;
                if(data.theme) this.theme = data.theme;
                if(data.commentaire) this.commentaire = data.commentaire;
                if(data.noligne) this.noligne = data.noligne;
                if(data.nbrligne) this.nbrligne = data.nbrligne;
                if(data.idtheme) this.idtheme = data.idtheme;

            }
        };



        addArticle() {
            let params = [this.userId, this.title, this.theme, this.userId, this.commentaire];
            let sqlQuery =
            `INSERT INTO articles (userId, title, fk_Theme, dateOfModificationA, dateOfCreationA) VALUES (?, ?, ?, NOW(), NOW());` +
            ` INSERT INTO comments (userId, idArticle, content, dateOfModification, dateOfCreation, fk_idtype) VALUES (?, LAST_INSERT_ID(), ?, NOW(), NOW(), 1);`;

            return db.executeSql(sqlQuery, params);

        };

        // id = nombre de lignes
        getAllArticle() {
            if(this.noligne == null) this.noligne=0;
            let params =  [this.noligne ,this.nbrligne];
            let sqlQuery =
            `WITH toto AS (
                SELECT content, idArticle,commentId, MIN(dateOfCreation) dateOfCreation FROM comments
                GROUP BY idArticle
                )
                SELECT * FROM articles a
                JOIN toto c ON a.idArticle = c.idArticle
                JOIN users ON users.userId = a.userId
                JOIN themes t ON a.fk_Theme = t.idThemes
                ORDER BY dateOfModificationA DESC LIMIT ? , ?`;
                console.log("xxxxxxxxxx", sqlQuery, this.nbrligne);
            return db.executeSql(sqlQuery, params);
        };
        getOneArticle(id) {
            console.log("on")
            let params = [id]
            let sqlQuery = `SELECT articles.idArticle, articles.title, articles.dateOfModificationA, users.userId, users.firstname
            AS firstname, users.lastname AS lastname FROM Articles
            INNER JOIN Users ON articles.userId = users.userId
            WHERE idArticle = ?
            ORDER BY dateOfModificationA DESC`;
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


        Articletheme() {
            if(this.noligne == null) this.noligne=0;
            let params =  [this.idtheme, this.noligne ,this.nbrligne];

            let sqlQuery = `WITH toto AS (
                SELECT content, idArticle,commentId, MIN(dateOfCreation) dateOfCreation FROM comments
                GROUP BY idArticle
                )
                SELECT * FROM articles a
                JOIN toto c ON a.idArticle = c.idArticle
                JOIN users ON users.userId = a.userId
                JOIN themes t ON a.fk_Theme = t.idThemes
                where a.fk_theme = ?
                ORDER BY dateOfModificationA DESC LIMIT ? , ?`;
                console.log("xxxxxxxxxx", sqlQuery);

            return db.executeSql(sqlQuery, params);
        };


        // Articletheme(id) {
        //     let params = [id];
        //     let sqlQuery = `WITH toto AS (
        //         SELECT content, idArticle,commentId, MIN(dateOfCreation) dateOfCreation FROM comments
        //         GROUP BY idArticle
        //         )
        //         SELECT * FROM articles a
        //         JOIN toto c ON a.idArticle = c.idArticle
        //         JOIN users ON users.userId = a.userId
        //         JOIN themes t ON a.fk_Theme = t.idThemes
        //         where a.fk_theme = ?
        //         ORDER BY dateOfModificationA DESC LIMIT 5 `;
        //         console.log("xxxxxxxxxx", sqlQuery);

        //     return db.executeSql(sqlQuery, params);
        // };
//
}
module.exports = Article;