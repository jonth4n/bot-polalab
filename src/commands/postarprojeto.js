const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const { criarProjeto } = require('../database/projetos');
const { isStaff } = require('../utils/permissions');



module.exports = {
  data: new SlashCommandBuilder()
    .setName('postar-projeto')
    .setDescription('Posta um novo projeto no servidor')

    .addStringOption(option =>
      option.setName('titulo')
        .setDescription('Título do projeto')
        .setRequired(true))

    .addStringOption(option =>
      option.setName('descricao')
        .setDescription('Descrição do projeto')
        .setRequired(true))

    .addAttachmentOption(option =>
      option.setName('imagem')
        .setDescription('Imagem do projeto')
        .setRequired(true)),

    async execute(interaction) {
        
        if (!isStaff(interaction.member)) {
            await interaction.reply({ content: 'Você não tem permissão para usar este comando.', ephemeral: true });
            return;
        }

        const titulo = interaction.options.getString('titulo');
        const descricao = interaction.options.getString('descricao');
        const imagem = interaction.options.getAttachment('imagem');

        const dados = {
          titulo,
          descricao,
          imagemUrl: imagem.url
        };

        const projetoId = criarProjeto(dados);

        const embed = new EmbedBuilder()
          .setTitle(titulo)
          .setDescription(descricao)
          .setImage(imagem.url)
          .setFooter({ text: `PolaLab - Projeto #${projetoId}` });

        await interaction.channel.send({ embeds: [embed] });

    }
};