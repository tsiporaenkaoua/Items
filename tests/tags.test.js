const request = require('supertest');
const app = require('../src/app');
const { pool } = require('../src/db');

//Au niv de la BDD on vide complètement table tags
beforeAll(async () => { 
  await pool.query('TRUNCATE TABLE tags');
});

afterAll(async () => { await pool.end(); });

//Au niv de l'app on fait tous nos tests sur notre CRUD
describe('Tags CRUD ', () => {
  let id;
  test('POST /api/tags -> 201', async () => { //test(url, fonction qui retourne 200/400/500)
    const r = await request(app).post('/api/tags').send({ name: 'Urgent' });
    expect(r.status).toBe(201);
    id = r.body.id;
  });
  test('GET /api/tags -> 200', async () => {
    const r = await request(app).get('/api/tags');
    expect(r.status).toBe(200);
    expect(Array.isArray(r.body)).toBe(true);
  });
  test('GET /api/tags/:id -> 200', async () => {
    const r = await request(app).get('/api/tags/' + id);
    expect(r.status).toBe(200);
  });
  test('PUT /api/tags/:id -> 200', async () => {
    const r = await request(app).put('/api/tags/' + id).send({ name: 'difficile' });
    expect(r.status).toBe(200);
  });
  test('DELETE /api/tags/:id -> 204', async () => {
    const r = await request(app).delete('/api/tags/' + id);
    expect(r.status).toBe(204);
  });
});


