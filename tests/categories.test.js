const request = require('supertest');
const app = require('../src/app');
const { pool } = require('../src/db');

beforeAll(async () => {
  await pool.query('TRUNCATE TABLE categories');
});

afterAll(async () => { await pool.end(); });

describe('Categories CRUD', () => {
  let id;
  test('POST /api/categories -> 201', async () => {
    const r = await request(app).post('/api/categories').send({ name: 'Cours' });
    expect(r.status).toBe(201);
    id = r.body.id; //sert à stocker l’id pour pouvoir l’utiliser dans les tests suivants.
  });
  test('GET /api/categories -> 200', async () => {
    const r = await request(app).get('/api/categories');
    expect(r.status).toBe(200);
    expect(Array.isArray(r.body)).toBe(true);
  });
  test('GET /api/categories/:id -> 200', async () => {
    const r = await request(app).get('/api/categories/' + id);
    expect(r.status).toBe(200);
  });
  test('PUT /api/categories/:id -> 200', async () => {
    const r = await request(app).put('/api/categories/' + id).send({ name: 'Cours maj' });
    expect(r.status).toBe(200);
  });
  test('DELETE /api/categories/:id -> 204', async () => {
    const r = await request(app).delete('/api/categories/' + id);
    expect(r.status).toBe(204);
  });
});

// TODO: Écrire des tests similaires pour /api/users, /api/items, /api/tags
