//iit et utilisation d'un mini routeur
const express = require('express');
const c = require('../controllers/categoriesController');
const r = express.Router(); // contient ttes nos routes 
r.get('/', c.apiList);
r.get('/:id', c.apiGet);
r.post('/', c.apiCreate);
r.put('/:id', c.apiUpdate);
r.delete('/:id', c.apiDelete);
module.exports = r;//Si quelqu’un fait require('./apiCategories'), renvoie-lui le routeur r
