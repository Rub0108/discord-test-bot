const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('bloon')
        .setDescription('Bloon game.'),
    async execute(interaction) {
        await interaction.reply('*POP*');
    },
};