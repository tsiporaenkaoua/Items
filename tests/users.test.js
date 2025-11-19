const request = require('supertest');
const app = require('../src/app');
const { pool } = require('../src/db');

beforeAll(async () => {
  await pool.query('TRUNCATE TABLE users');
});

afterAll(async () => { await pool.end(); });

describe('Users CRUD ', () => {
  let id;
  test('POST /api/users -> 201', async () => {
    const r = await request(app).post('/api/users').send({ name: 'Tsipora',email : 'tsipo@gmail.com'});
    expect(r.status).toBe(201);
    id = r.body.id;
  });
  test('GET /api/users -> 200', async () => {
    const r = await request(app).get('/api/users');
    expect(r.status).toBe(200);
    expect(Array.isArray(r.body)).toBe(true);
  });
  test('GET /api/users/:id -> 200', async () => {
    const r = await request(app).get('/api/users/' + id);
    expect(r.status).toBe(200);
  });
  test('PUT /api/users/:id -> 200', async () => {
    const r = await request(app).put('/api/users/' + id).send({ title:'Réviser chapitre 1', description:'Relire les notions principales du chapitre 1', status:'DRAFT', user_id:1, category_id: 1});
    expect(r.status).toBe(200);
  });
  test('DELETE /api/users/:id -> 204', async () => {
    const r = await request(app).delete('/api/users/' + id);
    expect(r.status).toBe(204);
  });
});


