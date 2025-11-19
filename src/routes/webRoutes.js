const express = require('express');
const cats = require('../controllers/categoriesController');
const users = require('../controllers/usersController');

const router = express.Router();

router.get('/', (_req, res) => res.redirect('/categories'));//lorsqu'on est a la racine du site on est redirigé vers cat
// la route correspond a l'url visible dans le navigateur
router.get('/categories', cats.pageList);
router.get('/categories/new', cats.pageNew);
router.post('/categories', cats.pageCreate);
router.get('/categories/:id/edit', cats.pageEdit);
router.put('/categories/:id', cats.pageUpdate);
router.delete('/categories/:id', cats.pageDelete);


// router.get('/users', users.pageList );
// router.get('/users/new', cats.pageNew);
// router.post('/users', cats.pageCreate);
// router.get('/users/:id/edit', cats.pageEdit);
// router.post('/users/:id?_method=PUT', cats.pageUpdate);
// router.post('/users/:id?_method=DELETE', cats.pageDelete);

module.exports = router;
 