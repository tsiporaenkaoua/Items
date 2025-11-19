const { pool } = require('../db');

// ---- API (exemple complet) ----
exports.apiList = async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM categories ORDER BY id DESC');
  res.json(rows);
};
exports.apiGet = async (req, res) => {
  const id = Number(req.params.id);
  const [rows] = await pool.query('SELECT * FROM categories WHERE id=?', [id]);
  if (!rows.length) return res.status(404).json({ message: 'Category not found' });
  res.json(rows[0]);
};
exports.apiCreate = async (req, res) => {
  const { name } = req.body;
  if (!name || !name.trim()) return res.status(400).json({ message: 'name required' });
  const [r] = await pool.query('INSERT INTO categories (name) VALUES (?)', [name]);
  const [rows] = await pool.query('SELECT * FROM categories WHERE id=?', [r.insertId]);
  res.status(201).json(rows[0]);
};
exports.apiUpdate = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  await pool.query('UPDATE categories SET name=? WHERE id=?', [name, id]);
  const [rows] = await pool.query('SELECT * FROM categories WHERE id=?', [id]);
  if (!rows.length) return res.status(404).json({ message: 'Category not found' });
  res.json(rows[0]);
};
exports.apiDelete = async (req, res) => {
  const id = Number(req.params.id);
  await pool.query('DELETE FROM categories WHERE id=?', [id]);
  res.status(204).send();
};

// ---- VUES (EJS) ----
exports.pageList = async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM categories ORDER BY id DESC');
  res.render('categories/index', { categories: rows });
};
exports.pageNew = (_req, res) => res.render('categories/new');
exports.pageCreate = async (req, res) => {
  const { name } = req.body;
  console.log(req.body.name);
  await pool.query('INSERT INTO categories (name) VALUES (?)', [name]);
  res.redirect('/categories'); //va au niv de la route cat et recharge la page - redirection coté serveur
};
exports.pageEdit = async (req, res) => {
  const id = Number(req.params.id);
  const [rows] = await pool.query('SELECT * FROM categories WHERE id=?', [id]);
  if (!rows.length) return res.status(404).send('Category not found');
  res.render('categories/edit', { category: rows[0] }); //renvoit la page html - redirection coté client
};
exports.pageUpdate = async (req, res) => {
  const id = Number(req.params.id);
  const { name } = req.body;
  await pool.query('UPDATE categories SET name=? WHERE id=?', [name, id]);
  res.redirect('/categories');
};
exports.pageDelete = async (req, res) => {
  const id = Number(req.params.id);
  await pool.query('DELETE FROM categories WHERE id=?', [id]);
  res.redirect('/categories');
};
