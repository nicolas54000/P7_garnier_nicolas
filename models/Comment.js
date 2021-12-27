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
        getAllComments(idArticle, nbOfComments) {
            let params = [idArticle, nbOfComments]
            let sqlQuery = `SELECT comments.commentId, comments.content, comments.dateOfModification,
            comments.idArticle, comments.userId, users.firstname
            AS firstname, users.lastname AS lastname FROM Comments
            INNER JOIN Users ON comments.userId = users.userId WHERE comments.idArticle = ??
            ORDER BY dateOfModification DESC LIMIT ?`;
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery);
        };
        updateComment(commentId) {
            let params = [this.content, commentId]
            let sqlQuery = `UPDATE Comments SET content=??,dateOfModification=NOW() WHERE idComments = ?`;
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery);
        }
        deleteOneComment(commentId) {
            let params = [commentId]
            let sqlQuery = `DELETE FROM Comments WHERE commentId = ?`;
            sqlQuery = db.preparer(mysql, sqlQuery, params)
            return db.executeSql(sqlQuery);
        }
}
module.exports = Comment;