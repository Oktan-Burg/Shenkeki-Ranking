const fs = require('fs')
const getFiles = require('./get-files')
var groups = {};
module.exports = (client) => {
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
  client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith('&')) return;
    const args = message.content.slice(1).split(/ +/)
    const commandName = args.shift().toLowerCase()
    if (!commands[commandName]) {
      return;
    }
    if (!message.member.roles.cache.some(role => role.name.toLowerCase() === 'ranking perms')) return message.reply('You must have the `Ranking Perms` role to execute any command.\n *If that role doesnt exist in your server ask the server host to make one.*');
    try {
      commands[commandName].callback(message, groups, ...args)
    } catch (error) {
      console.log(error)
    }
  })
}