const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentsCtrl = require('../controllers/comments');

//router.post('/', auth, commentsCtrl.addComment);

//router.put('/:id', auth, commentsCtrl.updateComment);

//router.delete('/:id', auth, commentsCtrl.deleteOneComment);

//router.get('/:id', auth, commentsCtrl.getAllComments);


router.post('/',  commentsCtrl.addComment);

router.put('/:id', commentsCtrl.updateComment);

router.delete('/:id', commentsCtrl.deleteOneComment);

router.get('/', commentsCtrl.getAllComments);

// tous les commantaires d'un article (id article)
router.get('/:id', commentsCtrl.getIdComments);


module.exports = router;