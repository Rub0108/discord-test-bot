const mongo = require("mongodb");
const { Client, Intents } = require("discord.js");

const { user, pass } = require("./login.json");
const { Token, prefix } = require("./config.json");

const mongoClient = mongo.MongoClient;
const url = `mongodb+srv://${user}:${pass}@cluster0.mutie.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new Client({ intents: [Intents.FLAGS.GUILDS] });

client.once("ready", () => {
  console.log("Ready.");
});

client.on("interactionCreate", async interaction => {
  if (!interaction.isCommand()) return;

  const { commandName } = interaction;

  if (commandName === "ping") {
    await interaction.reply("Pong!");
  } else if (commandName === "server") {
    await interaction.reply(`Server name: ${interaction.guild.name}\nTotal members: ${interaction.guild.memberCount}`);
  } else if (commandName === "user") {
    await interaction.reply(`Your tag: ${interaction.user.tag}\nYour id: ${interaction.user.id}`);
  } else if (commandName === "bloon") {
    await interaction.reply("*POP*");
  }
})

client.login(Token);