module.exports = {
  callback: (message, client, ...args) => {
    console.log(args)
    console.log(message.guild.id)
    message.reply('Pong!')
  },
}