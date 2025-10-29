require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
  const pool = await mysql.createPool({
    host: process.env.DB_HOST, port: process.env.DB_PORT,
    user: process.env.DB_USER, password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME, waitForConnections: true
  });
  try {
    await pool.query('SET FOREIGN_KEY_CHECKS=0');
    await pool.query('TRUNCATE TABLE item_tags');
    await pool.query('TRUNCATE TABLE items');
    await pool.query('TRUNCATE TABLE users');
    await pool.query('TRUNCATE TABLE tags');
    await pool.query('TRUNCATE TABLE categories');
    await pool.query('SET FOREIGN_KEY_CHECKS=1');
    console.log('🧹 Base nettoyée.');
  } catch (e) {
    console.error('reset-db:', e.message);
  } finally {
    await pool.end();
  }
  process.exit(0);
})();
