//toutes nos routes se trouvant ici sont précédé par ... api/

const express = require('express');
const categories = require('./categoriesApi');
// TODO: brancher users/items/tags quand implémentés
 const users = require('./usersApi');
// const items = require('./itemsApi');
// const tags = require('./tagsApi');
const router = express.Router();

router.get('/health', (_req, res) => res.json({ status: 'ok' }));
router.use('/categories', categories);

// TODO: activer quand prêts
 router.use('/users', users);
// router.use('/items', items);
// router.use('/tags', tags);

module.exports = router;
