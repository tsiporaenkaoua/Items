const express = require('express');
const cats = require('../controllers/categoriesController');
// TODO: importer users/items/tags lorsqu'implémentés
const router = express.Router();

router.get('/', (_req, res) => res.redirect('/categories'));

router.get('/categories', cats.pageList);
router.get('/categories/new', cats.pageNew);
router.post('/categories', cats.pageCreate);
router.get('/categories/:id/edit', cats.pageEdit);
router.post('/categories/:id?_method=PUT', cats.pageUpdate);
router.post('/categories/:id?_method=DELETE', cats.pageDelete);

// TODO: activer les routes /users, /items, /tags quand les contrôleurs seront prêts

module.exports = router;
