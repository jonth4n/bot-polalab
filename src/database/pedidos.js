const db = require('./db');

function criarPedido(dados) {
  const stmt = db.prepare(`
    INSERT INTO pedidos (userId, username, categoria, servico, pacote, extras, total, prazo, status, canalId)
    VALUES (@userId, @username, @categoria, @servico, @pacote, @extras, @total, @prazo, @status, @canalId)
  `);
  const info = stmt.run(dados);
  return info.lastInsertRowid;
}

function atualizarCanalPedido(id, canalId) {
  db.prepare('UPDATE pedidos SET canalId = ? WHERE id = ?').run(canalId, id);
}

function buscarPedidoPorId(id) {
  return db.prepare('SELECT * FROM pedidos WHERE id = ?').get(id);
}

function buscarPedidosPorUsuario(userId) {
  return db.prepare('SELECT * FROM pedidos WHERE userId = ? ORDER BY id DESC').all(userId);
}

function buscarPedidoAtivoPorUsuario(userId) {
  return db.prepare(`
    SELECT *
    FROM pedidos
    WHERE userId = ?
      AND status IN ('Aberto', 'Em produção', 'Aguardando pagamento')
    ORDER BY id DESC
    LIMIT 1
  `).get(userId);
}

function atualizarStatus(id, status) {
  db.prepare('UPDATE pedidos SET status = ? WHERE id = ?').run(status, id);
}

module.exports = {
  criarPedido,
  atualizarCanalPedido,
  buscarPedidoPorId,
  buscarPedidosPorUsuario,
  buscarPedidoAtivoPorUsuario,
  atualizarStatus
};