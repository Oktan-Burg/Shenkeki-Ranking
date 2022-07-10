const fs = require('fs');
const { MessageActionRow, MessageButton } = require('discord.js');
const { Modal, TextInputComponent, showModal } = require('discord-modals');
const { MessageEmbed, WebhookClient } = require('discord.js');
const Database = require("@replit/database")
const db = new Database()
const modals = require('discord-modals');
const discordreport = new Modal()
  .setCustomId('disc-report')
  .setTitle('Moderation Dropbox')
  .addComponents([
    new SelectMenuComponent() // We create a Select Menu Component
      .setCustomId('reason')
      .setPlaceholder('Why are you contacting support??')
      .addOptions(
        {
          label: "Discord Support",
          description: "Reporting a member in the server for breaking a rule or server assistance.",
          value: "usermod",
          emoji: "🧑"
        },
        {
          label: "Game Support",
          description: "To report a player for exploiting, scamming, breaking TOS or Game assistance like bugs, tips and sugguestions.",
          value: "gamemod",
          emoji: "🎮"
        }
      )
  ]);
////////////////////
const getFiles = require('./get-files')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var groups = {};
module.exports = (client, noblox) => {
  modals(client);
  const commands = {}
  const suffix = '.js'
  const commandFiles = getFiles('./commands', suffix)
  console.log(commandFiles)
  for (const command of commandFiles) {
    let commandFile = require(command)
    if (commandFile.default) commandFile = commandFile.default
    const split = command.replace(/\\/g, '/').split('/')
    const commandName = split[split.length - 1].replace(suffix, '')
    commands[commandName.toLowerCase()] = commandFile
  }
  console.log(commands)
  client.on('messageCreate', async (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith('.')) return;
    const args = message.content.slice(1).split(/ +/)
    const commandName = args.shift().toLowerCase()
    if (!commands[commandName]) {
      return;
    }
    if (!message.member.roles.cache.some(role => role.id === '')) return await message.reply('You must have the `approved` role to use this bot.');
    try {
      commands[commandName].callback(message, client, args)
    } catch (error) {
      console.log(error)
    }
  })
}