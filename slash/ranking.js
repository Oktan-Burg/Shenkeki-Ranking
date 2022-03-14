const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()
	  .setName('ranking')
	  .setDescription('Opens the ranking menu')
	  .addStringOption(option =>
		option.setName('user')
			.setDescription('Promoted user')
			.setRequired(true)),
}