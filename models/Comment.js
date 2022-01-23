

const db = require('../services/db')
const mysql = require('mysql');

class Comment {
        commentId = null;
        content = '';
        userId = null;
        idArticle = null;
        dateOfCreation = null;
        dateOfModification = null;



        constructor(data = null) {
            if(data != null) {
                if(data.content) this.content = data.content;
                if(data.idArticle) this.idArticle = data.idArticle;
                if(data.userId) this.userId = data.userId;
            }
        };

        addComment() {
            let params = [this.content, this.idArticle, this.userId]
            let sqlQuery = `INSERT INTO Comments (commentId, content, idArticle, userId, dateOfCreation, dateOfModification)
            VALUES (NULL, ??, ??, ??, NOW(), NOW())`;
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery);
        };

        /* getAllComments() {
            let params = [this.nombre]
            let sqlQuery = `WITH toto AS (
                SELECT content, idArticle,commentId, MIN(dateOfCreation) dateOfCreation FROM comments
                GROUP BY idArticle
                )
                SELECT * FROM articles a
                JOIN toto c ON a.idArticle = c.idArticle
                JOIN users ON users.userId = a.userId
                ORDER BY dateOfModificationA DESC LIMIT ?`;
            // sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery, params);
        }; */

        getIdComments(id) {
            let params = [id, 5]
            let sqlQuery =

            `SELECT * FROM comments
            JOIN articles c ON comments.idArticle = c.idArticle
            JOIN type ON idtype = comments.fk_idtype
            JOIN users ON users.userId = c.userId
            JOIN themes t ON c.fk_Theme = t.idThemes
            where c.idArticle = ?
            ORDER BY Comments.dateOfModification DESC
            LIMIT ?
            `  ;
            // sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery, params);
        };


        updateComment(commentId) {
            let params = [this.content, commentId]
            let sqlQuery = `UPDATE Comments SET content=??,dateOfModification=NOW() WHERE idComments = ?`;
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery);
        };

        deleteOneComment(commentId) {
            let params = [commentId]
            let sqlQuery = `DELETE FROM Comments WHERE commentId = ?`;
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery);
        };
}
module.exports = Comment;