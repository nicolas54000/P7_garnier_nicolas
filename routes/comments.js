const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const commentsCtrl = require('../controllers/comments');

router.post('/', auth, commentsCtrl.addComment);

router.put('/:id', auth, commentsCtrl.updateComment);

router.delete('/:id', auth, commentsCtrl.deleteOneComment);

router.get('/:id', auth, commentsCtrl.getAllComments);

module.exports = router;