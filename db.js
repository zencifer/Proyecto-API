const Database = require('better-sqlite3');
const db = new Database('users.db');

// Crear la tabla si no existe
db.prepare(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nombre TEXT,
    apellido TEXT
  )
`).run();

module.exports = db;
