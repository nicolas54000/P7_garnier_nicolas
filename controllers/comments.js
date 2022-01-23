const Comment = require('../models/Comment');

exports.getAllComments = (req, res, next) => {
    const commentObject = new Comment({
    nombre: req.body.nombre,
    });
    commentObject.getAllComments().then(comments => {
        res.status(200).json(comments)
    }).catch(error => res.status(400).json({ error }));
};

exports.getIdComments = (req, res, next) => {
    const commentObject = new Comment();
    commentObject.getIdComments(req.params.id).then(comments => {
        res.status(200).json(comments)
    }).catch(error => res.status(400).json({ error }));
};


exports.addComment = (req, res, next) => {
    const commentObject = new Comment({
        content: req.body.content,
        idArticle: req.body.idArticle,
        userId: req.body.userId
    });
    commentObject.addComment().then((comment) => {
        res.status(201).json(comment);
    }).catch(error => res.status(400).json({ error }));
};

exports.updateComment = (req, res, next) => {
    const commentObject = new Comment({
        content: req.body.content
    });
    commentObject.updateComment().then((comment) => {
        res.status(200).json(comment);
    }).catch(error => res.status(400).json({ error }));
};

exports.deleteOneComment = (req, res, next) => {
    const commentObject = new Comment();
    commentObject.deleteOneComment(req.params.id).then(() => {
        res.status(200).end();
    }).catch(error => res.status(400).json({ error }));
};