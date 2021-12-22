const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const usersCtrl = require('../controllers/users');

// Limiter pour attaques de force brute
const rateLimit = require("express-rate-limit");
const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 10
});

// Importation du middleware qui permet de vérifier si le mot de passe entré pour un enregistrement d'utilisateur est assez fort
const passwordCtrl = require('../middleware/password-validator');

router.post('/signup', apiLimiter, passwordCtrl, usersCtrl.signUp);

router.post('/login', apiLimiter, usersCtrl.logIn);

router.delete('/:id', auth, usersCtrl.desactivateUser);

router.put('/:id', auth, usersCtrl.updateUser);

router.put('/log/:id', usersCtrl.updateUserLog);

//router.get('/:id', auth, usersCtrl.findOne);

// *********  ng ***********

router.get('/', usersCtrl.allUsers);

router.get('/:id', usersCtrl.findOne);

module.exports = router;