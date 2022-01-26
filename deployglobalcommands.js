//require assets
const fs = require("fs");
const { REST } = require("@discordjs/rest");
const { Routes } = require("discord-api-types/v9");


//info from files
const { clientId, Token } = require("./config.json");

//establish commands (gonna change to dynamic)
const commands = [];
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  if (!command.guild) {
    commands.push(command.data.toJSON());
  }
}

require("./deleteglobalslash.js").clear();

//set rest
const rest = new REST({ version: "9" }).setToken(Token);

//register commands and alert
rest.put(Routes.applicationCommands(clientId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
  