const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('support')
	  .setDescription('Displays the support Form.'),
  
}