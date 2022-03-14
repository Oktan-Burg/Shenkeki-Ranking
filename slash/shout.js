const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('shout')
	  .setDescription('Displays the shout UI.'),
  
}