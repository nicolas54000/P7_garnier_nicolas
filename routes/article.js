const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const articlesCtrl = require('../controllers/articles');


// router.get('/:id', auth, articlesCtrl.getOneArticle);

//  ajout d'un article
router.post('/', articlesCtrl.addArticle);

//  mise a jour article
router.put('/:id',  auth, articlesCtrl.updateArticle);

// suppression article
router.delete('/:id', auth ,articlesCtrl.deleteOneArticle);


// tous les articles nbr = nombre de ligne  derniers ligne N eme ligne

router.get("/all/:ligne/:nbr", articlesCtrl.getAllArticle);

// tous les articles par themes
router.get('/theme/:id/:ligne/:nbr', articlesCtrl.Articletheme);



module.exports = router;