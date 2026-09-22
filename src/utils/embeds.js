const { EmbedBuilder } = require('discord.js');

function precoInicialServico(servico) {
  const precos = servico.pacotes.map(p => p.preco);
  return Math.min(...precos);
}

function buildCategoriasOverviewEmbed(config) {
  const embed = new EmbedBuilder()
    .setTitle('📋 Serviços na PolaLab')
    .setDescription('Escolha uma categoria no menu abaixo para ver os serviços disponíveis. Após cofirmar o orçamento, você deve responder o formulario:)')
    .setColor(0x8A63D2);

  for (const categoria of config.categorias) {
    embed.addFields({ name: categoria.nome, value: categoria.descricao });
  }

  return embed;
}

function buildCategoriaDetailEmbed(categoria) {
  const embed = new EmbedBuilder()
    .setTitle(categoria.nome)
    .setDescription(categoria.descricao)
    .setColor(0x8A63D2);

  for (const servico of categoria.servicos) {
    const precoInicial = precoInicialServico(servico);
    embed.addFields({
      name: servico.nome,
      value: `${servico.descricao}\n💰 A partir de R$ ${precoInicial}\n⏱️ Prazo: ${servico.prazoEstimado}`
    });
  }

  return embed;
}

function buildResumoEmbed(categoria, servico, pacote, extras, total) {
  const embed = new EmbedBuilder()
    .setTitle('🧾 Resumo do pedido')
    .setColor(0x8A63D2)
    .addFields(
      { name: 'Categoria', value: categoria.nome, inline: true },
      { name: 'Serviço', value: servico.nome, inline: true },
      { name: 'Pacote', value: `${pacote.nome} — R$ ${pacote.preco}` },
      { name: 'Prazo estimado', value: servico.prazoEstimado }
    );

  embed.addFields({
    name: 'Extras',
    value: extras.length > 0
      ? extras.map(e => `${e.nome} — R$ ${e.preco}`).join('\n')
      : 'Nenhum'
  });

  embed.addFields({ name: 'Total', value: `**R$ ${total}**` });

  return embed;
}

function buildPagamentoOverviewEmbed(paymentsConfig) {
  const embed = new EmbedBuilder()
    .setTitle('💳 Formas de pagamento disponiveis')
    .setDescription('Escolha uma forma de pagamento no menu abaixo para podermos saber como te guiar no processo.')
    .setColor(0x8A63D2);

  for (const metodo of paymentsConfig.metodos) {
    embed.addFields({ name: metodo.nome, value: '\u200b' });
  }

  return embed;
}

function buildPagamentoInstrucoesEmbed(metodo) {
  return new EmbedBuilder()
    .setTitle(`💳 ${metodo.nome}`)
    .setDescription(metodo.instrucoes)
    .setColor(0x8A63D2);
}

function buildFaqOverviewEmbed(faqConfig) {
  const embed = new EmbedBuilder()
    .setTitle('❓ Perguntas frequentes')
    .setDescription('Escolha uma pergunta no menu abaixo para receber suporte rapidamente.')
    .setColor(0x8A63D2);

  for (const pergunta of faqConfig.perguntas) {
    embed.addFields({ name: pergunta.pergunta, value: '\u200b' });
  }

  return embed;
}

function buildFaqRespostaEmbed(pergunta) {
  return new EmbedBuilder()
    .setTitle(`❓ ${pergunta.pergunta}`)
    .setDescription(pergunta.resposta)
    .setColor(0x8A63D2);
}

function buildPedidosEmbed(pedidos) {
  const embed = new EmbedBuilder()
    .setTitle('📦 Seus pedidos')
    .setColor(0x8A63D2);

  for (const pedido of pedidos.slice(0, 10)) {
    const extras = JSON.parse(pedido.extras);
    embed.addFields({
      name: `Pedido #${pedido.id} — ${pedido.status}`,
      value:
        `${pedido.servico} (${pedido.pacote})\n` +
        `Extras: ${extras.length > 0 ? extras.join(', ') : 'Nenhum'}\n` +
        `Total: R$ ${pedido.total} | Prazo: ${pedido.prazo}` +
        (pedido.canalId ? `\nCanal: <#${pedido.canalId}>` : '')
    });
  }

  return embed;
}


module.exports = {
  precoInicialServico,
  buildCategoriasOverviewEmbed,
  buildCategoriaDetailEmbed,
  buildResumoEmbed,
  buildPagamentoOverviewEmbed,
  buildPagamentoInstrucoesEmbed,
  buildFaqOverviewEmbed,
  buildFaqRespostaEmbed,
  buildPedidosEmbed
};