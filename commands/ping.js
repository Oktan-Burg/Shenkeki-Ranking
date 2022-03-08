module.exports = {
  callback: (message, groups, ...args) => {
    console.log(args)
    console.log(message.guild.id)
    message.reply('Pong!')
  },
}