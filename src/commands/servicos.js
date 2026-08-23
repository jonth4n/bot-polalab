const { SlashCommandBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');
const { carregarServices } = require('../utils/servicesLoader');
const { buildCategoriasOverviewEmbed } = require('../utils/embeds');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('servicos')
    .setDescription('Veja os serviços oferecidos pela PolaLab'),

  async execute(interaction) {
    const servicesConfig = carregarServices();
    const embed = buildCategoriasOverviewEmbed(servicesConfig);

    const select = new StringSelectMenuBuilder()
      .setCustomId('servicos_categoria')
      .setPlaceholder('Selecione uma categoria para ver detalhes')
      .addOptions(
        servicesConfig.categorias.map(categoria => ({
          label: categoria.nome,
          value: categoria.id,
          description: categoria.descricao.slice(0, 90)
        }))
      );

    const row = new ActionRowBuilder().addComponents(select);
    await interaction.reply({ embeds: [embed], components: [row] });
  }
};