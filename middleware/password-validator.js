const passwordStrength = require('check-password-strength');


// Middleware pour vérifier la complexité du mot passe donné lors de l'inscription
passwordValidator = (req, res, next) => {
    try {
        if (passwordStrength.passwordStrength(req.body.password).password < 5) {
            throw 'Le mot doit contenir au mois 4 caractères, 1 minuscule, 1 majuscule, 1 symbol, 1 nombre minimum';
        } else {
            next();
        }
    } catch (error) {
        res.status(400).json({ error: error });
    }

};
module.exports = passwordValidator;