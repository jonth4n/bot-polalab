const { SlashCommandBuilder } = require('discord.js');
const { carregarFaq } = require('../utils/faqLoader');
const { buildFaqReply } = require('../utils/faqUI');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('faq')
    .setDescription('Perguntas frequentes sobre os serviços'),

  async execute(interaction) {
    const faqConfig = carregarFaq();
    const payload = buildFaqReply(faqConfig);
    await interaction.reply({ ...payload, ephemeral: true });
  }
};