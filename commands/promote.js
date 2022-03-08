const Database = require("@replit/database")
const db = new Database()
async function promote (message, args) {
  let id = await noblox.getIdFromUsername(args[1])
  noblox.promote(2, id)
}
module.exports = {
  callback: (message, groups, ...args) => {
    console.log(args)
    if (!groups[msg.guild.id]) return message.reply('The group has not been set or has been reset use the `&group {Group ID}`')
    noblox.setCookie('2').then(promote(message))
  },
}