const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const themesCtrl = require('../controllers/themes');


// tous les themes
router.get('/',  themesCtrl.getThemes);

module.exports = router;