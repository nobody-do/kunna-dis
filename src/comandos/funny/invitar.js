const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require("discord.js");

module.exports = {
    DESCRIPTION: "",
    ALIASES: ["inv"],
    PERMISSIONS: [""],
    BOT_PERMISSIONS: ['ViewChannel'],
    OWNER: false,
  execute(client, message, args, prefix, GUILD_DATA) {

    const row = new ActionRowBuilder()
      .addComponents(
        new ButtonBuilder()
          .setLabel("Invitar")
          .setStyle(ButtonStyle.Link)
          .setURL(`https://discord.com/`),
        new ButtonBuilder()
          .setLabel("GitHub")
          .setStyle(ButtonStyle.Link)
          .setURL("https://github.com/"),
        new ButtonBuilder()
          .setLabel("Soporte")
          .setStyle(ButtonStyle.Link)
          .setURL("https://discord.com/")
/*        new ButtonBuilder()
          .setLabel("Lo que quieras")
          .setStyle(ButtonStyle.Link)
          .setURL("https://discord.com/") */
      );

    const mainPage = new EmbedBuilder()
      .setAuthor({ name: 'Lo que quieras', iconURL: 'https://images-ext-2.discordapp.net/external/TkJJnBuBLzY4BySXObrbdfrW4SaPYerMRrOGpKc0I5E/%3Fsize%3D2048/https/cdn.discordapp.com/embed/avatars/2.png' })
      .setThumbnail('https://images-ext-2.discordapp.net/external/TkJJnBuBLzY4BySXObrbdfrW4SaPYerMRrOGpKc0I5E/%3Fsize%3D2048/https/cdn.discordapp.com/embed/avatars/2.png')
      .setColor(0x304357)
      .addFields([{ name: 'Invitar', value: `[Invitar](https://discord.com/)` }])
    message.reply({ embeds: [mainPage], components: [row] })
  }
}