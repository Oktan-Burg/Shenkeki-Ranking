const fs = require('fs');
const { MessageActionRow, MessageButton } = require('discord.js');
const { Modal, TextInputComponent, showModal } = require('discord-modals'); // Now we extract the showModal method
const { MessageEmbed, WebhookClient } = require('discord.js');
const Database = require("@replit/database")
const db = new Database()
async function promote(client,step1,user,noblox,i,id,rankName) {
  let name = await noblox.getUsernameFromId(Number.parseInt(step1))
  await noblox.promote(12944789, id).catch(error => {})
  const rankName2 = await noblox.getRankNameInGroup(12944789, id).catch(error =>  {})
  await i.reply(`The user has been ranked!!\n${user} | ${rankName} → ${rankName2}`).catch(error => {})
  const embed = new MessageEmbed()
	  .setTitle('Ranking Log')
	  .setColor('#0099ff')
    .setDescription(`Ranking Officer: ${name}\nAction: Promote\n
Target: ${user} (${id})
Rank Change: ${rankName} → ${rankName2}`)
  await i.guild.channels.cache.find(i => i.name === '⭐｜rank-logs').send({ embeds: [embed] });
}
async function suspend(client,step1,user,noblox,i,id,rankName) {
  let name = await noblox.getUsernameFromId(Number.parseInt(step1))
  db.set(id, rankName)
  await noblox.setRank(12944789, id, '[SUS] Suspended').catch(error => { })
  const rankName2 = await noblox.getRankNameInGroup(12944789, id).catch(error =>  {})
  await i.reply(`The user has been suspended!!\n${user} | ${rankName} → [SUS] Suspended`).catch(error => {})
  const embed = new MessageEmbed()
	  .setTitle('Ranking Log')
	  .setColor('#0099ff')
    .setDescription(`Ranking Officer: ${name}\nAction: Suspend\n
Target: ${user} (${id})
Rank Change: ${rankName} → [SUS] Suspended`)
  await i.guild.channels.cache.find(i => i.name === '⭐｜rank-logs').send({ embeds: [embed] });
}
async function unsuspend(client,step1,user,noblox,i,id,rankName) {
  let name = await noblox.getUsernameFromId(Number.parseInt(step1))
  let rank = await db.get(id, rankName)
  await noblox.setRank(12944789, id, rank).catch(error => {})
  const rankName2 = await noblox.getRankNameInGroup(12944789, id).catch(error =>  {})
  await i.reply(`The user has been unsuspended!!\n${user} | [SUS] Suspended → ${rankName2}`).catch(error => {})
  db.delete(id)
  const embed = new MessageEmbed()
	  .setTitle('Ranking Log')
	  .setColor('#0099ff')
    .setDescription(`Ranking Officer: ${name}\nAction: Unsuspend\n
Target: ${user} (${id})
Rank Change: [SUS] Suspended → ${rankName2}`)
  await i.guild.channels.cache.find(i => i.name === '⭐｜rank-logs').send({ embeds: [embed] });
}
async function demote(client,step1,user,noblox,i,id,rankName) {
  let name = await noblox.getUsernameFromId(Number.parseInt(step1))
  await noblox.demote(12944789, id).catch(error => {})
  const rankName2 = await noblox.getRankNameInGroup(12944789, id).catch(error =>  {})
  await i.reply(`The user has been ranked!!\n${user} | ${rankName2} ← ${rankName}`).catch(error => {})
  const embed = new MessageEmbed()
	  .setTitle('Ranking Log')
	  .setColor('#0099ff')
    .setDescription(`Ranking Officer: ${name}\nAction: Demote\n
Target: ${user} (${id})
Rank Change: ${rankName2} ← ${rankName}`)
  await i.guild.channels.cache.find(i => i.name === '⭐｜rank-logs').send({ embeds: [embed] });
}
const modals = require('discord-modals');
console.warn = () => { };
const modal = new Modal() // We create a Modal
  .setCustomId('Shout-Menu')
  .setTitle('Shout Menu')
  .addComponents([
    new TextInputComponent() // We create a Text Input Component
      .setCustomId('text-Shout')
      .setLabel('Your shout...')
      .setStyle('LONG') //IMPORTANT: Text Input Component Style can be 'SHORT' or 'LONG'
      .setMinLength(1)
      .setMaxLength(255)
      .setPlaceholder('Type your shout here.')
      .setRequired(true) // If it's required or not
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
  client.on('messageCreate', (message) => {
    if (message.author.bot) return;
    if (!message.content.startsWith('.')) return;
    const args = message.content.slice(1).split(/ +/)
    const commandName = args.shift().toLowerCase()
    if (!commands[commandName]) {
      return;
    }
    if (!message.member.roles.cache.some(role => role.name.toLowerCase() === 'high command')) return message.reply('You must have the `High Command` role to execute any command.\n*If that role doesnt exist in your server ask the server host to make one.*');
    try {
      commands[commandName].callback(message, client, args)
    } catch (error) {
      console.log(error)
    }
  })
  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;
    if (!interaction.member.roles.cache.some(r => r.name.toLowerCase() === "high command")) return interaction.reply({ content: 'You must have the High Command role to execute commands', ephemeral: true }).catch(error => {});
    ///////////////////////////////////////////
    if (interaction.commandName.toLowerCase() === 'ranking') {
      let user = interaction.options.getString('user')
      let id = await noblox.getIdFromUsername(user).catch(error => {
        interaction.reply({ content: 'There was an error fetching that user.\n*User may not exist.*', ephemeral: true })
        return;
      })
      const Http = new XMLHttpRequest();
      const url= `https://api.blox.link/v1/user/${interaction.user.id}?guild=937598465184251944`
      Http.open("GET", url);
      Http.send();
      var authorId
      var step1
      Http.onreadystatechange = async (e) => {
        if (Http.responseText.toLowerCase().includes('error')) return interaction.reply({ content: 'You appear to not be verified with bloxlink.\n*Fix: Verify with bloxlink.*', ephemeral: true }).catch(error => { })
        console.log(Http.responseText)
        step1 = Http.responseText.slice(33).replace('","matchingAccount":null}', '')
        const rankId = await noblox.getRankInGroup(12944789, Number.parseInt(step1)).catch(error =>  {})
        const rankId2 = await noblox.getRankInGroup(12944789, id).catch(error =>  {})
        /* -------------------------------------------
        if (rankId === rankId2) return interaction.reply({ content: 'You cant moderate a rank the same as yours.', ephemeral: true })
        if (rankId < rankId2) return interaction.reply({ content: 'You cant moderate a rank higher then yours.', ephemeral: true })
        ------------------------------------------- */
        let userinfo = await noblox.getPlayerInfo({userId: id}).catch(error =>  {})
        const rankName = await noblox.getRankNameInGroup(12944789, id)
        const exampleEmbed = new MessageEmbed()
	        .setColor('#2f3136')
	        .setTitle(`Player Moderation | Ranking`)
          .setThumbnail(`https://www.roblox.com/headshot-thumbnail/image?userId=${id}&width=420&height=420&format=png`)
	        .setURL(`https://www.roblox.com/users/${id}/profile`)
	        .addFields(
		        { name: 'Username', value: userinfo.username, inline: true },
            { name: 'Display Name', value: userinfo.displayName, inline: true },
            { name: '** **', value: '** **' },
	        )
          .addFields(
            { name: 'Rank', value: rankName, inline: true},
            { name: 'Age', value: userinfo.age.toString(), inline: true }
          )
	        .setTimestamp();
        const row = new MessageActionRow()
			    .addComponents(
				    new MessageButton()
					    .setCustomId('promotebtn')
					    .setLabel('Promote')
					    .setStyle('SUCCESS'),
            new MessageButton()
					    .setCustomId('demotebtn')
					    .setLabel('Demote')
					    .setStyle('DANGER'),
            new MessageButton()
					    .setCustomId('suspendbtn')
					    .setLabel('Suspend')
					    .setStyle('PRIMARY'),
            new MessageButton()
					    .setCustomId('unsuspendbtn')
					    .setLabel('Unsuspend')
					    .setStyle('PRIMARY'),
			  );
        interaction.reply({ embeds: [exampleEmbed], components: [row]}).catch(error => { })
        const filter = i => i.user.id === interaction.user.id;

        const collector = interaction.channel.createMessageComponentCollector({ filter, time: 20000 });

        collector.on('collect', async i => {
	        if (i.customId === 'promotebtn') {
		        if (rankId === rankId2) return i.reply({ content: 'You cant moderate a rank the same as yours.', ephemeral: true })
            if (rankId < rankId2) return i.reply({ content: 'You cant moderate a rank higher then yours.', ephemeral: true })
            await noblox.setCookie(process.env.COOKIE).then(promote(client,step1,user,noblox,i,id,rankName))
	        }
          if (i.customId === 'demotebtn') {
		        if (rankId === rankId2) return i.reply({ content: 'You cant moderate a rank the same as yours.', ephemeral: true })
            if (rankId < rankId2) return i.reply({ content: 'You cant moderate a rank higher then yours.', ephemeral: true })
            await noblox.setCookie(process.env.COOKIE).then(demote(client,step1,user,noblox,i,id,rankName))
	        }
          if (i.customId === 'suspendbtn') {
		        if (rankId === rankId2) return i.reply({ content: 'You cant moderate a rank the same as yours.', ephemeral: true })
            if (rankId < rankId2) return i.reply({ content: 'You cant moderate a rank higher then yours.', ephemeral: true })
            await noblox.setCookie(process.env.COOKIE).then(suspend(client,step1,user,noblox,i,id,rankName))
	        }
          if (i.customId === 'unsuspendbtn') {
		        if (rankId === rankId2) return i.reply({ content: 'You cant moderate a rank the same as yours.', ephemeral: true })
            if (rankId < rankId2) return i.reply({ content: 'You cant moderate a rank higher then yours.', ephemeral: true })
            await noblox.setCookie(process.env.COOKIE).then(unsuspend(client,step1,user,noblox,i,id,rankName))
	        }
        });

      collector.on('end', collected => console.log(`Collected ${collected.size} items`));
      }
    }
    if (interaction.commandName.toLowerCase() === 'shout') {
      if (!interaction.member.permissions.has('ADMINISTRATOR')) return interaction.reply('You need admin permissions to use this command')
      noblox.setCookie(process.env.COOKIE).then(
        showModal(modal, {
          client: client,
          interaction: interaction,
        })
      )
    }
    client.on('modalSubmit', async (modall) => {
      if (modall.customId === 'Shout-Menu') {
        const chat = modall.getTextInputValue('text-Shout')
        await noblox.setCookie(process.env.COOKIE).then(
          noblox.shout(12944789, chat).catch(error => { })
        )
        await modall.reply({ content: 'Your group shout has been sent!', ephemeral: true }).catch(error => { });
      }
    })
    
  });
}