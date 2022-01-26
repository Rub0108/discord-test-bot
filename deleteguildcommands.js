module.exports = {
  clear: function () {
    const { REST } = require("@discordjs/rest");
    const { Routes } = require("discord-api-types/v9");
    const { Client, Intents } = require("discord.js");

    const { Token, clientId } = require("./config.json");

    const client = new Client({intents: [Intents.FLAGS.GUILDS]});
    
    const guildss = [];
    client.on("ready", async () => {
      client.guilds.cache.forEach(guild => {
        guildss.push(guild.id);
      })
      client.destroy();
    })
    
    client.login(Token);
   
    const promises = [];

    const rest = new REST({ version: "9" }).setToken(Token);
    for (const gui of guildss) {
      rest.get(Routes.applicationGuildCommands(clientId, gui))
        .then(data => {
          for (const command of data) {
            const deleteUrl = `${Routes.applicationGuildCommands(clientId, gui)}/${command.id}`;
            promises.push(rest.delete(deleteUrl));
        }
      })
    }
    return Promise.all(promises);
  }
}