const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("bloon")
    .setDescription("Pops a balloon."),
  async execute(interaction) {
    await interaction.reply("*POP*");
  },
}