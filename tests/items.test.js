const request = require('supertest');
const app = require('../src/app');
const { pool } = require('../src/db');

beforeAll(async () => {
  await pool.query('TRUNCATE TABLE items');
});

afterAll(async () => { await pool.end(); });

describe('Items CRUD', () => {
  let id;
  test('POST /api/items -> 201', async () => {
    const r = await request(app).post('/api/items').send({title : 'Réviser chapitre 1', description :'Relire les notions principales du chapitre 1', status : 'DRAFT', user_id : 2, category_id : 2})

    expect(r.status).toBe(201);
    id = r.body.id;
  });
  test('GET /api/items -> 200', async () => {
    const r = await request(app).get('/api/items');
    expect(r.status).toBe(200);
    expect(Array.isArray(r.body)).toBe(true);
  });
  test('GET /api/items/:id -> 200', async () => {
    const r = await request(app).get('/api/items/' + id);
    expect(r.status).toBe(200);
  });
  test('PUT /api/items/:id -> 200', async () => {
    const r = await request(app).put('/api/items/' + id).send({ title: 'title maj' });
    expect(r.status).toBe(200);
  });
  test('DELETE /api/items/:id -> 204', async () => {
    const r = await request(app).delete('/api/items/' + id);
    expect(r.status).toBe(204);
  });
});