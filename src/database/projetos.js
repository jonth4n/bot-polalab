const db = require('./db');

function criarProjeto(dados) {
  const stmt = db.prepare(`
    INSERT INTO projetos (titulo, descricao, imagemUrl)
    VALUES (@titulo, @descricao, @imagemUrl)
  `);
  const info = stmt.run(dados);
  return info.lastInsertRowid;
}

module.exports = {
  criarProjeto
};