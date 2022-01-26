//require assets
const fs = require("fs");
const mongo = require("mongodb");
const { Client, Intents, Collection, } = require("discord.js");

//require info from files
const { user, pass } = require("./login.json");
const { Token, prefix } = require("./config.json");

//login to mongo
const mongoClient = mongo.MongoClient;
const url = `mongodb+srv://${user}:${pass}@cluster0.mutie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

//set up client for discord
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.DIRECT_MESSAGES] });

client.commands = new Collection();
const commandFiles = fs.readdirSync("./commands").filter(file => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.data.name, command);
}

//ready alert
client.once("ready", () => {
  console.log("Ready.");
});

//slash command execute
client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) return;

  try {
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    await interaction.reply({ content: "There was an error while executing this command.", ephemeral: true });
  }
});

//fill in for commands with prefix
/*client.on("messageCreate", message => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  message.channel.send(".");
});*/

//login
client.login(Token);