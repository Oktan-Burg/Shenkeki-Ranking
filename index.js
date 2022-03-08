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
  handler(client)
})
// Functions start
///////////

////
keepAlive();
client.login(process.env.TOKEN)