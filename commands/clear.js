const Database = require("@replit/database")
const db = new Database()
const { client } = require('../index.js')
module.exports = {
  callback: (message, groups, ...args) => {
    console.log(args)
    console.log(message.guild.id)
    if (message.author.id === '853322763930828800') {
      if (!args[0]) return message.reply('Specify your deletion type.')
      if (args[0].toLowerCase() === 'all') {
        db.empty()
        groups = {}
        console.log('Data Has been removed')
      } 
    }
  },
}