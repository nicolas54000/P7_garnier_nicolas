const express = require('express');

const bodyParser = require('body-parser');

const app = express();

const path = require('path');

// packages liés à la SECURITE
// Setup headers
const helmet = require('helmet');
// Traiter les données pour éviter les injections SQL
const sanitizer = require('express-html-sanitizer');
const sanitizeReqBody = sanitizer();

// Configuration du fichier contenant les variables sensibles pour les accès et ainsi les cacher du code
require('dotenv').config();

const articlesRoutes = require('./routes/article');
const usersRoutes = require('./routes/users');
//const commentsRoutes = require('./routes/comments');


app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Traitement de sécurité
app.use(sanitizeReqBody);

app.use(helmet());

app.use('/images', express.static(path.join(__dirname, 'images')));

// Routes
app.use('/api/articles', articlesRoutes);

//app.use('/api/comments', commentsRoutes);

app.use('/api/users', usersRoutes);


module.exports = app;