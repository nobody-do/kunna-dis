
const profile = require('../../database/schemas/badges')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder } = require ('discord.js')
module.exports = { 
    CMD: new SlashCommandBuilder()
    .setDescription("Mira el perfil de un usuario")
    .addUserOption(option =>
        option.setName("usuario")
        .setDescription("Usuario a ver perfil")
        .setRequired(true)
    ),
    async   execute(client, interaction, prefix, GUILD_DATA){

        let member = interaction.options.getUser("usuario")
 
        const data = await profile.findOne({ id: member.id })
        if (!data) {
            await profile.create({ id: member.id })
            return interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(process.env.COLOR)
                        .setAuthor({ name: `Perfil de ${member.tag}`, iconURL: member.displayAvatarURL({ dynamic: true})})
                        .addFields({name: "__Insignias__", value: `> No tienes insignias`},
                        {name: "Creación de la cuenta:", value: `> <t:${Math.floor(member.createdAt / 1000)}:R>`})
                        .setFooter({ text: `Perfil solicitado por ${interaction.member.user.tag}` })
                        .setThumbnail(member.displayAvatarURL({ dynamic: true}))
                ]
            })
        }


        let badge
        if (data.badges.length === 0) badge = `No tienes insignias`
        else badge = data.badges.join(' ')
            .replace('owner', "<:crown:1031806522591817748>")
            .replace('dev', "<a:valid_code:999571358117797938>")
            .replace("staff", "<:staff:1049905504878612570>")
            .replace("supporter", "<:early_supporter:1050892583183855688>")
            .replace("bug", "<:bughunter:1002841052467703859>")
            .replace('premium', "<a:nitro:1001618273173000273>")
        const embed = new EmbedBuilder()
            .setColor(process.env.COLOR)
            .setAuthor({ name: `Perfil de ${member.tag}`, iconURL: member.displayAvatarURL({ dynamic: true})})
            .addFields({name: "__Insignias__", value: `> ${badge}`},
            {name: "Creación de la cuenta:", value: `> <t:${Math.floor(member.createdAt / 1000)}:R>`})
            .setFooter({ text: `Perfil solicitado por ${interaction.member.user.tag}` })
            .setThumbnail(member.displayAvatarURL({ dynamic: true}))
        interaction.reply({ embeds: [embed] })
    },
};
