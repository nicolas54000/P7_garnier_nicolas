const themes = require('../models/themes');
const fs = require('fs');


exports.getThemes = (req, res, next) => {

    const articleObject = new themes();
        articleObject.getThemes().then(articles => {
        res.status(200).json(articles)
    }).catch(error => res.status(400).json({ error }));
};