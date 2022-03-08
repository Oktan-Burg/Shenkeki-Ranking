const Database = require("@replit/database")
const db = new Database()
module.exports = {
  callback: (message, groups, ...args) => {
    console.log(args)
    let cookie = args[0]
    let group = args[1]
    if (!cookie) return message.reply('No cookie detected.')
    if (!cookie.startsWith('_|WARNING:-DO-NOT-SHARE-THIS.--Sharing-this-will-allow-someone-to-log-in-as-you-and-to-steal-your-ROBUX-and-items.')) return message.reply('Your cookie provided was invalid')
    if (!group) return message.reply('We are missing your group ID');
    db.set(message.guild.id, `${cookie}`)
    groups[message.guild.id] = group
    console.log(`Group: { ${groups[message.guild.id]} }`)
    console.log(`Cookie: { ${cookie} }`)
  },
}