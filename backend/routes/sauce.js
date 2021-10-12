const express = require('express');

const router = express.Router();

//const Thing = require('../models/Thing'); // Déplacer dans le dossier routes/stuff.js en modifiant ../models/Thing,
//plus utile car on va importer dans le controllers

const auth = require('../middleware/auth'); // Importer le middleware auth pour protèger les routes des middleware
const multer = require('../middleware/multer-config'); // Importer le middleware multer-config pour enregistrer des fichiers images
const stuffCtrl = require('../controllers/stuff'); // on met celà a la place de ../models/Thing

// Dans le fichier du dossier routes, on va remplacer app.* par router.* et remplacer /api/stuff par /
//Routes pour CRUD complet (creation, lecture, modification, suppression des ressources de l'application)

// Route pour créer un thing
router.post('/', auth, multer, stuffCtrl.createThing);

// Deplacer dans le dossier controllers/stuff.js la fonction uniquement.
// router.post('/', (req, res, next) => {
//     delete req.body._id;
//     const thing = new Thing({
//       ...req.body
//     });
//     thing.save()
//       .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
//       .catch(error => res.status(400).json({ error }));
// });


// Route pour modifier un thing
router.put('/:id', auth, multer, stuffCtrl.modifyThing);

// Deplacer dans le dossier controllers/stuff.js la fonction uniquement.
// router.put('/:id', (req, res, next) => {
//     Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//       .catch(error => res.status(400).json({ error }));
// });

// Route pour supprimer un thing
router.delete('/:id', auth, stuffCtrl.deleteThing);

// Deplacer dans le dossier controllers/stuff.js la fonction uniquement.
// router.delete('/:id', (req, res, next) => {
//     Thing.deleteOne({ _id: req.params.id })
//       .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
//       .catch(error => res.status(400).json({ error }));
// });


// Route pour recuperer un thing avec son id
router.get('/:id', auth, stuffCtrl.getOneThing);

// Deplacer dans le dossier controllers/stuff.js la fonction uniquement.
// router.get('/:id', (req, res, next) => {
//     Thing.findOne({ _id: req.params.id })
//       .then(thing => res.status(200).json(thing))
//       .catch(error => res.status(404).json({ error }));
// });


// Route pour recuperer tous les things
router.get('/', auth, stuffCtrl.getAllThings);

// Deplacer dans le dossier controllers/stuff.js la fonction uniquement.
// router.get('/', (req, res, next) => {
//     Thing.find()
//       .then(things => res.status(200).json(things))
//       .catch(error => res.status(400).json({ error }));
// });

module.exports = router;