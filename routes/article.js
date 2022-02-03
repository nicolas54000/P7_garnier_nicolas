const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const articlesCtrl = require('../controllers/articles');

/* router.post('/', auth, multer, articlesCtrl.addArticle);

router.put('/:id', auth, multer, articlesCtrl.updateArticle);

router.delete('/:id', auth, articlesCtrl.deleteOneArticle);

router.get('/:id', auth, articlesCtrl.getOneArticle);

router.get('/', auth, articlesCtrl.getAllArticle); */

//  ajout d'un article
router.post('/', articlesCtrl.addArticle);

//  mise a jour article
router.put('/:id',  multer, articlesCtrl.updateArticle);

// suppression article
router.delete('/:id',  articlesCtrl.deleteOneArticle);

// recherche d'un article par id
router.get('/:id',  articlesCtrl.getOneArticle);

// tous les articles n derniers
router.get('/all/:id', articlesCtrl.getAllArticle);

// tous les articles par themes
router.get('/theme/:id',  articlesCtrl.Articletheme);



module.exports = router;