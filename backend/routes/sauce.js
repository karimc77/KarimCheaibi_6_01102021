const express = require('express');

const router = express.Router();

// Importer le middleware auth pour protèger les routes des middleware
const auth = require('../middleware/auth');

// Importer le middleware multer-config pour enregistrer des fichiers images
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

// Dans le fichier du dossier routes, on va remplacer app.* par router.* et remplacer /api/sauces par /
//Routes pour CRUD complet (creation, lecture, modification, suppression des ressources de l'application)

// Route pour créer une sauce
// Route pour modifier une sauce
// Route pour supprimer une sauce
// Route pour recuperer une sauce avec son id
// Route pour recuperer toutes les sauces

router.post('/', auth, multer, sauceCtrl.createSauce);
router.put('/:id', auth, multer, sauceCtrl.modifySauce);
router.delete('/:id', auth, sauceCtrl.deleteSauce);
router.get('/:id', auth, sauceCtrl.getOneSauce);
router.get('/', auth, sauceCtrl.getAllSauces);

module.exports = router;