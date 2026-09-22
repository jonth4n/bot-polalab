const Database = require('better-sqlite3');
const path = require('node:path');

const db = new Database(path.join(__dirname, '..', '..', 'pedidos.sqlite'));

db.exec(`
  CREATE TABLE IF NOT EXISTS pedidos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    userId TEXT NOT NULL,
    username TEXT NOT NULL,
    categoria TEXT NOT NULL,
    servico TEXT NOT NULL,
    pacote TEXT NOT NULL,
    extras TEXT NOT NULL,
    total INTEGER NOT NULL,
    prazo TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Aberto',
    canalId TEXT,
    criadoEm TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);
db.exec(`
  CREATE TABLE IF NOT EXISTS projetos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    imagemUrl TEXT NOT NULL
  )
`);

module.exports = db;