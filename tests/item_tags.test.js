const request = require('supertest');
const app = require('../src/app');
const { pool } = require('../src/db');

beforeAll(async () => {
  await pool.query('TRUNCATE TABLE item_tags');
});

afterAll(async () => { await pool.end(); });

describe('Item_tags CRUD', () => {
  const item_id = 2;
  const tag_id =3;
  test('POST /api/item_tags -> 201', async () => {
    const r = await request(app).post('/api/item_tags').send({item_id :item_id, tag_id :tag_id})
    expect(r.status).toBe(201);
  });
  test('GET /api/item_tags -> 200', async () => {
    const r = await request(app).get('/api/item_tags');
    expect(r.status).toBe(200);
    expect(Array.isArray(r.body)).toBe(true);
  });
  // test('GET /api/item_tags/:id -> 200', async () => {
  //   const r = await request(app).get('/api/item_tags/' + item_id);
  //   expect(r.status).toBe(200);
  // });
  // test('PUT /api/item_tags/:id -> 200', async () => {
  //   const r = await request(app).put('/api/item_tags/' + id).send({ title: 'title maj' });
  //   expect(r.status).toBe(200);
  // });
  // test('DELETE /api/item_tags/:id -> 204', async () => {
  //   const r = await request(app).delete('/api/item_tags/' + id);
  //   expect(r.status).toBe(204);
  // });
});