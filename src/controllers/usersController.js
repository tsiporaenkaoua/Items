// TODO: à implémenter par les élèves (suivez l'exemple de categoriesController.js)

const { pool } = require('../db');

// ---- API (exemple complet) ----
exports.apiList = async (_req, res) => { // _req : (ici non utilisé, d’où le _ devant pour signifier “je ne m’en sers pas” 
  const [rows] = await pool.query('SELECT * FROM users ORDER BY id DESC'); //la méthode query() de mysql2/promise renvoie un tableau [rows, fields]. rows = les résultats (les données),fields = les métadonnées des colonnes (qu’on ignore ici)
  res.json(rows);
};
exports.apiGet = async (req, res) => { 
  const id = Number(req.params.id);
  const [rows] = await pool.query('SELECT * FROM users WHERE id=?', [id]);
  if (!rows.length) return res.status(404).json({ message: 'User not found' });//return arrête immédiatement l’exécution de la fonction
  res.json(rows[0]);
};
exports.apiCreate = async (req, res) => { 
  const { name, email } = req.body;
  if (!name || !name.trim() || !email || !email.trim()) return res.status(400).json({ message: 'name and email required' });
  const [r] = await pool.query('INSERT INTO users (name,email) VALUES (?,?)', [name, email]);
  const [rows] = await pool.query('SELECT * FROM users WHERE id=?', [r.insertId]);
  res.status(201).json(rows[0]);
};
exports.apiUpdate = async (req, res) => { // ne permet pas de modifier l'email
  const id = Number(req.params.id);
  const { name } = req.body;
  await pool.query('UPDATE users SET name=? WHERE id=?', [name, id]);
  const [rows] = await pool.query('SELECT * FROM users WHERE id=?', [id]);
  if (!rows.length) return res.status(404).json({ message: 'User not found' });
  res.json(rows[0]);
};
exports.apiDelete = async (req, res) => {
  const id = Number(req.params.id);
  await pool.query('DELETE FROM users WHERE id=?', [id]);
  res.status(204).send();
};

// ---- VUES (EJS) ----
exports.pageList = async (_req, res) => {//ok
  const [rows] = await pool.query('SELECT * FROM users ORDER BY id DESC');
  res.render('users/index', { users: rows });
};
exports.pageNew = (_req, res) => res.render('categories/new');
exports.pageCreate = async (req, res) => {
  const { name } = req.body;
  await pool.query('INSERT INTO categories (name) VALUES (?)', [name]);
  res.redirect('/categories');
};
exports.pageEdit = async (req, res) => {
  const id = Number(req.params.id);
  const [rows] = await pool.query('SELECT * FROM categories WHERE id=?', [id]);
  if (!rows.length) return res.status(404).send('Category not found');
  res.render('categories/edit', { category: rows[0] });
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
