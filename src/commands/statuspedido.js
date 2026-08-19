const { SlashCommandBuilder } = require('discord.js');
const { buscarPedidoPorId, atualizarStatus } = require('../database/pedidos');
const { isStaff } = require('../utils/permissions');

const STATUS_VALIDOS = ['Aberto', 'Em produção', 'Aguardando pagamento', 'Concluído', 'Cancelado'];

module.exports = {
  data: new SlashCommandBuilder()
    .setName('statuspedido')
    .setDescription('(Equipe) Atualiza o status de um pedido')
    .addIntegerOption(option =>
      option.setName('id').setDescription('ID do pedido').setRequired(true))
    .addStringOption(option =>
      option.setName('status').setDescription('Novo status').setRequired(true)
        .addChoices(...STATUS_VALIDOS.map(s => ({ name: s, value: s })))),

  async execute(interaction) {
    if (!isStaff(interaction.member)) {
      await interaction.reply({ content: 'Apenas a equipe do PolaLab pode usar esse comando.', ephemeral: true });
      return;
    }

    const id = interaction.options.getInteger('id');
    const status = interaction.options.getString('status');

    const pedido = buscarPedidoPorId(id);
    if (!pedido) {
      await interaction.reply({ content: `Pedido #${id} não encontrado.`, ephemeral: true });
      return;
    }

    atualizarStatus(id, status);

await interaction.reply({
  content: `✅ Status do pedido #${id} atualizado para **${status}**.`
});

if (pedido.canalId) {
  const canal = await interaction.guild.channels
    .fetch(pedido.canalId)
    .catch(() => null);

  if (canal) {
    await canal.send(`📌 Status do pedido atualizado para: **${status}**`);

    if (status === 'Concluído' || status === 'Cancelado') {
      setTimeout(async () => {
        await canal.delete().catch(() => {});
      }, 3000);
    }
  }
}
}
};