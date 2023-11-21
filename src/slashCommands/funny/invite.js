const { EmbedBuilder, CommandInteraction, ButtonStyle, Client, ButtonBuilder, ActionRowBuilder, SlashCommandBuilder } = require("discord.js")

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("invitame a tu servidor!"),
    PERMISSIONS: [""],
    BOT_PERMISSIONS: [""],
    OWNER: false,

    execute: async (client, interaction, prefix, GUILD_DATA) => {
        await interaction.deferReply({
            ephemeral: false
        });

           
    const row = new ActionRowBuilder()
    .addComponents(
    new ButtonBuilder()
    .setLabel("Invitar")
    .setStyle(ButtonStyle.Link)
    .setURL('https://discord.com/'),
	new ButtonBuilder()
    .setLabel("GitHub")
    .setStyle(ButtonStyle.Link)
    .setURL("https://github.com/"),
    new ButtonBuilder()
    .setLabel("Soporte")
    .setStyle(ButtonStyle.Link)
    .setURL("https://discord.com/")
/*    new ButtonBuilder()
    .setLabel("Lo que quieras")
    .setStyle(ButtonStyle.Link)
    .setURL("https://discord.com/") */
			);

          const mainPage = new EmbedBuilder()
            .setAuthor({ name: 'Hola!', iconURL: 'https://images-ext-2.discordapp.net/external/TkJJnBuBLzY4BySXObrbdfrW4SaPYerMRrOGpKc0I5E/%3Fsize%3D2048/https/cdn.discordapp.com/embed/avatars/2.png'})
            .setThumbnail('https://images-ext-2.discordapp.net/external/TkJJnBuBLzY4BySXObrbdfrW4SaPYerMRrOGpKc0I5E/%3Fsize%3D2048/https/cdn.discordapp.com/embed/avatars/2.png')
            .setColor(0x304357)
             .addFields([{ name: 'Invitar', value: `[Invitar](https://discord.com/api/oauth2/authorize?client_id=1170181516878430269&permissions=0&scope=bot)`}])
             await interaction.followUp({embeds: [mainPage], components: [row]})
    }
}