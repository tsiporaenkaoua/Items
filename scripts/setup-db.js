require('dotenv').config();
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

(async () => {
  try {
    const sql = fs.readFileSync(path.join(__dirname, 'schema.sql'), 'utf8');
    const pool = await mysql.createPool({
      host: process.env.DB_HOST, port: process.env.DB_PORT,
      user: process.env.DB_USER, password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME, waitForConnections: true
    });
    for (const stmt of sql.split(/;\s*\n/)) {
      if (stmt.trim()) await pool.query(stmt);
    }
    await pool.end();
    console.log('✅ Schéma appliqué.');
    process.exit(0);
  } catch (e) {
    console.error('❌ setup-db:', e.message);
    process.exit(1);
  }
})();
