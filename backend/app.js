const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

//const Thing = require('./models/Thing'); // Déplacer dans le dossier routes/stuff.js en modifiant ../models/Thing

// Importer le router
const stuffRoutes = require('./routes/stuff');

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

app.use('/images', express.static(path.join(__dirname, 'images'))); // pour renvoyer l'image dans le front end 

// Comme les routes sont dans le dossier routes, on va créer la route pour utiliser le router qu'on a crée dans le fichier stuff.js
app.use('/api/stuff', stuffRoutes);

// Lorsque que l'on crrée le router, on vient coller les routes dans le fichier /routes/stuff.js
// //Routes pour CRUD complet (creation, lecture, modification, suppression des ressources de l'application)

// // Route pour créer un thing
// app.post('/api/stuff', (req, res, next) => {
//     delete req.body._id;
//     const thing = new Thing({
//       ...req.body
//     });
//     thing.save()
//       .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
//       .catch(error => res.status(400).json({ error }));
// });


// // Route pour modifier un thing
// app.put('/api/stuff/:id', (req, res, next) => {
//     Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//       .catch(error => res.status(400).json({ error }));
// });

// // Route pour supprimer un thing
// app.delete('/api/stuff/:id', (req, res, next) => {
//     Thing.deleteOne({ _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
//       .catch(error => res.status(400).json({ error }));
// });


// // Route pour recuperer un thing avec son id 
// app.get('/api/stuff/:id', (req, res, next) => {
//     Thing.findOne({ _id: req.params.id })
//       .then(thing => res.status(200).json(thing))
//       .catch(error => res.status(404).json({ error }));
// });


// // Route pour recuperer tous les things
// app.get('/api/stuff', (req, res, next) => {
//     Thing.find()
//       .then(things => res.status(200).json(things))
//       .catch(error => res.status(400).json({ error }));
// });


// Comme les routes sont dans le dossier routes, on va créer la route pour utiliser le router qu'on a crée dans le fichier user.js
app.use('/api/auth', userRoutes);




module.exports = app;