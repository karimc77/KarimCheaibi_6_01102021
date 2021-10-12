const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

// Importer le router
const sauceRoutes = require('./routes/sauce');

// Importer le router user
const userRoutes = require('./routes/user');

// Connection a la base de données mongoose
mongoose.connect('mongodb+srv://karimc77:Karim77550@cluster0.mjbih.mongodb.net/cluster0?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => console.log(error, 'Connexion à MongoDB échouée !'));


// Connection à l'application express, empecher des erreurs CORS sur l'objet response (res)
const app = express();

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

// Utilisation de bodyparser
app.use(bodyParser.json());

// pour renvoyer l'image dans le front end 
app.use('/images', express.static(path.join(__dirname, 'images'))); 

// Comme les routes sont dans le dossier routes, on va créer la route pour utiliser le router qu'on a crée dans le fichier sauce.js
// Comme les routes sont dans le dossier routes, on va créer la route pour utiliser le router qu'on a crée dans le fichier user.js
app.use('/api/sauces', sauceRoutes);
app.use('/api/auth', userRoutes);

module.exports = app;