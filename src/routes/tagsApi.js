const express = require('express');
const c = require('../controllers/tagsController');

const r = express.Router(); // mini routeur contenant ttes nos routes

r.get('/', c.apiList);
r.get('/:id', c.apiGet);
r.post('/', c.apiCreate);
r.put('/:id', c.apiUpdate);
r.delete('/:id', c.apiDelete);

module.exports = r;