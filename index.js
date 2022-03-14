const Discord = require("discord.js");
const fs = require('node:fs');
const group = new Set();
const { Collection } = require('discord.js');
const database = require("@replit/database");
const db = new database();
const noblox = require('noblox.js')
const { MessageActionRow, MessageButton, MessageOptions, MessageEmbed } = require('discord.js');
const { Intents, Permissions } = require("discord.js")
const client = new Discord.Client({ intents: [Intents.FLAGS.GUILD_PRESENCES, Intents.FLAGS.GUILD_MEMBERS, Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const keepAlive = require("./server");
client.on("ready", () => {
  
  let handler = require('./command-handler')
  if (handler.default) handler = handler.default
  client.user.setPresence({ activities: [{ name: 'Shenkeki Studios' }] });
  console.log(`Logged in as ${client.user.tag}!`)
  handler(client, noblox)
})
// Functions start
///////////
////////////
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const commands = [];
// Place your client and guild ids here
const clientId = '951210820090626108';
const guildId = '937598465184251944';
const commandFiles = fs.readdirSync('./slash').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./slash/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN);

(async () => {
	try {
		console.log('Started refreshing application (/) commands.');

		await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log('Successfully reloaded application (/) commands.');
	} catch (error) {
		console.error(error);
	}
})();
////
keepAlive();
client.login(process.env.TOKEN)