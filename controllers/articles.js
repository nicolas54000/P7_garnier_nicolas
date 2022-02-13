const Article = require('../models/Article');
const fs = require('fs');

exports.getAllArticle = (req, res, next) => {
    console.log(req.headers.authorization);
    console.log(req.params.ligne);
    const articleObject = new Article(
        {
        nbrligne: parseInt(req.params.nbr),
        noligne: parseInt(req.params.ligne),

    });
        articleObject.getAllArticle().then(articles => {
        res.status(200).json(articles)
    }).catch(error => res.status(400).json({ error }));
};

exports.getOneArticle = (req, res, next) => {

    const articleObject = new Article();
    articleObject.getOneArticle(req.params.id).then(article => {
        res.status(200).json(article)
    }).catch(error => res.status(400).json({ error }));
};

exports.deleteOneArticle = (req, res, next) => {
    const articleObject = new Article();
    articleObject.getOneArticle(req.params.id).then((article) => {
            articleObject.deleteOneArticle(req.params.id)
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
    };


exports.addArticle = (req, res, next) => {
    const articleObject = new Article({
        title: req.body.title,
        commentaire: req.body.commentaire,
        userId: req.body.userId,
        theme: req.body.theme,
    });

    articleObject.addArticle().then((article) => {
        res.status(201).json(article);
    }).catch(error => res.status(400).json({ error }));
};

exports.updateArticle = (req, res, next) => {
    const articleObject = new Article({
        title: req.body.title,

    });
    articleObject.updateArticle(req.params.id).then((article) => {
        res.status(200).json(article);
    }).catch(error => res.status(400).json({ error }));
};

exports.Articletheme = (req, res, next) => {
       const articleObject = new Article({
        idtheme: req.params.id,
        nbrligne: parseInt(req.params.nbr),
        noligne: parseInt(req.params.ligne),

    });
    articleObject.Articletheme().then((article) => {
        res.status(200).json(article);
    }).catch(error => res.status(400).json({ error }));
};




// exports.getThemes = (req, res, next) => {

//     const articleObject = new Article();
//         articleObject.getThemes().then(articles => {
//         res.status(200).json(articles)
//     }).catch(error => res.status(400).json({ error }));
// };