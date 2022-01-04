const { SlashCommandBuilder } = require("@discordjs/builders");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { clientId, guildId, Token } = require("./config.json");

const commands = [
  new SlashCommandBuilder().setName("ping").setDescription("Replies with pong."),
  new SlashCommandBuilder().setName("server").setDescription("Replies with server info."),
  new SlashCommandBuilder().setName("user").setDescription("Replies with user info."),
  new SlashCommandBuilder().setName("bloon").setDescription("Pops a balloon.")
]
  .map(command => command.toJSON());

const rest = new REST({ version: "9" }).setToken(Token);

rest.put(Routes.applicationGuildCommand(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
  