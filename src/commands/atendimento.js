const { SlashCommandBuilder } = require('discord.js');
const { carregarMessages } = require('../utils/messagesLoader');
const { buscarPedidoAtivoPorUsuario, atualizarStatus } = require('../database/pedidos');

const cooldowns = new Map();
const COOLDOWN = 5 * 60 * 1000; // 5 minutos

module.exports = {
  data: new SlashCommandBuilder()
    .setName('atendimento')
    .setDescription('Chame a equipe do PolaLab para te ajudar'),

  async execute(interaction) {
    
    const agora = Date.now();
    const ultimoAtendimento = cooldowns.get(interaction.user.id);

    if (ultimoAtendimento && agora - ultimoAtendimento < COOLDOWN) {
      const restante = Math.ceil(
        (COOLDOWN - (agora - ultimoAtendimento)) / 1000
      );

      const minutos = Math.floor(restante / 60);
      const segundos = restante % 60;

      return interaction.reply({
        content: `⏳ Você precisa esperar ${minutos}m ${segundos}s para chamar a equipe novamente.`,
        ephemeral: true
      });
    }

    cooldowns.set(interaction.user.id, agora);
        const pedidoAtivo = buscarPedidoAtivoPorUsuario(interaction.user.id);

   if (pedidoAtivo) {
  const canal = pedidoAtivo.canalId
    ? await interaction.guild.channels.fetch(pedidoAtivo.canalId).catch(() => null)
    : null;

  if (canal) {
    return interaction.reply({
      content: `⚠️ Você já possui um pedido em andamento: ${canal}`,
      ephemeral: true
    });
  }

  
  atualizarStatus(pedidoAtivo.id, 'Cancelado');
}
    const messages = carregarMessages();
    const staffRoleId = process.env.STAFF_ROLE_ID;
    const mencaoStaff = staffRoleId
      ? `<@&${staffRoleId}>`
      : 'a equipe';

    const texto = messages.atendimento.template
      .replace('{usuario}', interaction.user)
      .replace('{staff}', mencaoStaff);

    await interaction.reply({
      content: texto
    });
  }
};