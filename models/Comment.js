

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
            let sqlQuery = `INSERT INTO Comments (commentId, content, idArticle, userId, dateOfCreation, dateOfModification, fk_idtype)
            VALUES (NULL, ?, ?, ?, NOW(), NOW(), 1)`;
            return db.executeSql(sqlQuery, params);
        };

        // recherche par id

        IdComments(id) {
            let params = [id]
            let sqlQuery =

            `SELECT * FROM comments
            JOIN articles c ON comments.idArticle = c.idArticle
            JOIN type ON idtype = comments.fk_idtype
            JOIN users ON users.userId = comments.userId
            JOIN themes t ON c.fk_Theme = t.idThemes
            where commentId = ?`;
            return db.executeSql(sqlQuery, params);
        };


        getIdComments(id) {
            let params = [id, 5]
            let sqlQuery =

            `SELECT * FROM comments
            JOIN articles c ON comments.idArticle = c.idArticle
            JOIN type ON idtype = comments.fk_idtype
            JOIN users ON users.userId = comments.userId
            JOIN themes t ON c.fk_Theme = t.idThemes
            where c.idArticle = ?
            ORDER BY Comments.dateOfCreation
            LIMIT ?
            `  ;
            // sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery, params);
        };


        updateComment(commentId) {
            let params = [this.content, commentId]
            let sqlQuery = `UPDATE Comments SET content=?,dateOfModification=NOW() WHERE commentId = ?`;
            return db.executeSql(sqlQuery, params);
        };

        deleteOneComment(commentId) {
            let params = [commentId]
            let sqlQuery = `DELETE FROM Comments WHERE commentId = ?`;
            return db.executeSql(sqlQuery, params);
        };
}
module.exports = Comment;