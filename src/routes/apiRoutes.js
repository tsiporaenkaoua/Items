//toutes nos routes se trouvant ici sont précédé par ... api/
//Le routeur principale se trouve ici

//recupération du chemin de nos mini routeurs
const express = require('express');
const categories = require('./categoriesApi');
const users = require('./usersApi');
const items = require('./itemsApi');
const tags = require('./tagsApi');
const item_tags = require('./item_tagsApi');
const router = express.Router();

router.get('/health', (_req, res) => res.json({ status: 'ok' }));

router.use('/categories', categories);// ici Express va préfixer toutes les routes définies dans categories.js par /categories
router.use('/users', users);
router.use('/items', items);
router.use('/tags', tags);
router.use('/item_tags', item_tags);

module.exports = router;
