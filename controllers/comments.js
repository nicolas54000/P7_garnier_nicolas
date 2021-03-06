const Comment = require('../models/Comment');

exports.getAllComments = (req, res, next) => {
    const commentObject = new Comment({
    nombre: req.body.nombre,
    });
    commentObject.getAllComments(5).then(comments => {
        res.status(200).json(comments)
    }).catch(error => res.status(400).json({ error }));
};

exports.getIdComments = (req, res, next) => {
    const commentObject = new Comment();
    commentObject.getIdComments(req.params.id).then(comments => {
        res.status(200).json(comments)
    }).catch(error => res.status(400).json({ error }));
};

exports.IdComments = (req, res, next) => {
    const commentObject = new Comment();
    commentObject.IdComments(req.params.id).then(comments => {
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
    commentObject.updateComment(req.params.id).then((comment) => {
        res.status(200).json(comment);
    }).catch(error => res.status(400).json({ error }));
};

exports.deleteOneComment = (req, res, next) => {
    const commentObject = new Comment();
    commentObject.deleteOneComment(req.params.id).then(() => {
        res.status(200).end();
    }).catch(error => res.status(400).json({ error }));
};

exports.addlike = (req, res, next) => {
    const commentObject = new Comment(
{
    commentId: req.body.commentId,
    userId: req.body.userId,
    value: req.body.value
}
    );
    commentObject.addlike(req.params.id).then(() => {
        res.status(200).end();
    }).catch(error => res.status(400).json({ error }));
};

exports.lirelike = (req, res, next) => {
    const commentObject = new Comment(
{

    commentId: parseInt(req.params.commentId),
    userId: parseInt(req.params.userId),
}
      );
    commentObject.lirelike(req.params.id).then((like) => {
        res.status(200).json(like);
    }).catch(error => res.status(400).json({ error }));
};

exports.modiflike = (req, res, next) => {
    const commentObject = new Comment(
{
    commentId: req.body.commentId,
    userId: req.body.userId,
    value: req.body.value
}
    );
    commentObject.modiflike(req.params.id).then(() => {
        res.status(200).end();
    }).catch(error => res.status(400).json({ error }));
};