const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentsCtrl = require('../controllers/comments');


router.post('/',  commentsCtrl.addComment);

router.put('/:id', commentsCtrl.updateComment);

router.delete('/:id', auth, commentsCtrl.deleteOneComment);

router.get('/', commentsCtrl.getAllComments);

// tous les commentaires d'un article (id article)
router.get('/:id', commentsCtrl.getIdComments);

//  recharcge un commentaire par son id
router.get('/un/:id', commentsCtrl.IdComments);

// *****   likes *****

router.post('/like/ajout',  commentsCtrl.addlike);

router.get('/like/lire/:userId/:commentId',  commentsCtrl.lirelike);

router.put('/like/modif',  commentsCtrl.modiflike);


module.exports = router;