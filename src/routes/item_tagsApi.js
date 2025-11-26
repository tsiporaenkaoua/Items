const express = require('express');
const c = require('../controllers/item_tagsController');
const r = express.Router(); // contient ttes nos routes 
r.get('/', c.apiList);
r.get('/:id', c.apiGet); // le id correspond a celui du item dont on recherche tous les tags
r.post('/', c.apiCreate);
r.put('/:id', c.apiUpdate);
r.delete('/:id', c.apiDelete);
module.exports = r;