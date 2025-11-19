const { pool } = require('../db');


exports.apiList = async (_req, res) => {
  const [rows] = await pool.query('SELECT * FROM items ORDER BY id DESC');
  res.json(rows);
};
exports.apiGet = async (req, res) => {
  const id = Number(req.params.id);
  const [rows] = await pool.query('SELECT * FROM items WHERE id=?', [id]);
  if (!rows.length) return res.status(404).json({ message: 'Item not found' });
  res.json(rows[0]);
};
exports.apiCreate = async (req, res) => {
  const { title, description, status, user_id, category_id } = req.body;
  
  if (!title || !title.trim()) return res.status(400).json({ message: 'title required' });
  const [r] = await pool.query('INSERT INTO items (title, description, status, user_id , category_id ) VALUES (?,?,?,?,?)', [title, description, status, user_id, category_id]);
  const [rows] = await pool.query('SELECT * FROM items WHERE id=?', [r.insertId]);
  res.status(201).json(rows[0]);
};
exports.apiUpdate = async (req, res) => {
  const id = Number(req.params.id);
  const { item } = req.body;
  await pool.query('UPDATE items SET name=? WHERE id=?', [item, id]);
  const [rows] = await pool.query('SELECT * FROM items WHERE id=?', [id]);
  if (!rows.length) return res.status(404).json({ message: 'Item not found' });
  res.json(rows[0]);
};

  exports.apiUpdate = async (req, res) => {
  const id = Number(req.params.id);
  const { title, description, status } = req.body; 
  await pool.query( //coalesce → prend la nouvelle valeur si tu l’as envoyée,sinon garde la valeur déjà existante dans la colonne
    `UPDATE items 
     SET 
       title = COALESCE(?, title), 
       description = COALESCE(?, description),
       status = COALESCE(?, status)
     WHERE id = ?`,
    [title, description, status, id]
  );
  const [rows] = await pool.query('SELECT * FROM items WHERE id=?', [id]);
  if (!rows.length) return res.status(404).json({ message: 'Item not found' });
  res.json(rows[0]);
};

exports.apiDelete = async (req, res) => {
  const id = Number(req.params.id);
  await pool.query('DELETE FROM items WHERE id=?', [id]);
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
