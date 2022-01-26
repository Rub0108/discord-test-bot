const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");
const { Client, Intents } = require("discord.js");

const { clientId, Token } = require("./config.json");

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

require("./deleteguildcommands.js").clear();

const guildss = [];

const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));
client.on("ready", async () => {
  client.guilds.cache.forEach(guild => {
    guildss.push(guild.id);
  });
  client.destroy();
  for (const gui of guildss) {
    const commands = [];
    for (const file of commandFiles) {
      var match = false;
      const command = require(`./commands/${file}`);
      if (!command.guild) break;
      for (const comgui of command.guild) {
        if (comgui == gui) {
          match = true;
          break;
        }
      }
      if (match == true) {
        commands.push(command.data.toJSON());
      }
    }
    const rest = new REST({ version: "9" }).setToken(Token);

    rest.put(Routes.applicationGuildCommands(clientId, gui), { body: commands })
      .catch(console.error);
  }
  console.log("Guild commands registered.")
});

client.login(Token);