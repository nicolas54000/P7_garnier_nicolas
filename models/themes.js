const db = require('../services/db')
const mysql = require('mysql');

class themes {
        idThemes = null;
        Image = '';
        Nom_theme='';


        constructor(data = null) {
            if(data != null) {
                if(data.idThemes) this.userId = data.idThemes;
                if(data.Nom_theme) this.title = data.Nom_theme;
                if(data.Image) this.theme = data.Image;

            }
        };


        getThemes() {
            let sqlQuery =
            `SELECT * FROM projet7.themes`;
            return db.executeSql(sqlQuery);
        };
}
module.exports = themes;