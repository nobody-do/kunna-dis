const { EmbedBuilder } = require('@discordjs/builders')

const { Client, SlashCommandBuilder, ChatInputCommandInteraction } = require('discord.js')

module.exports = {

    CMD: new SlashCommandBuilder()

    .setName("uptime")

    .setDescription("Show bot Uptime"),

    async execute(client, interaction) {

      let totalSeconds = (client.uptime / 1000);

let days = Math.floor(totalSeconds / 86400);

totalSeconds %= 86400;

let hours = Math.floor(totalSeconds / 3600);

totalSeconds %= 3600;

let minutes = Math.floor(totalSeconds / 60);

let seconds = Math.floor(totalSeconds % 60);

      let uptime = `${days} days, ${hours} hours, ${minutes} minutes and ${seconds} seconds`;

            const embed = new Discord.EmbedBuilder()

.setTitle(':green_circle: Uptime Stats:')

      .setDescription(`\`\`\`+ Status : Online\n+ ${uptime}\`\`\``)

    await interaction.reply({embeds: [embed]});

    }

}