const Database = require("@replit/database")
const db = new Database()
module.exports = {
  callback: (message, groups, ...args) => {
    if (groups[message.guild.id] === undefined) return message.reply('You must setup our bot first.')
    if (message.member.permissions.has(ADMINISTRATOR)) return message.reply('You must have administrator permissions to use this command.');
    //////
    
    //////
  }
}