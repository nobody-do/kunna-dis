const profile = require('../../database/schemas/badges')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder } = require ('discord.js')
module.exports = { 
    DESCRIPTION: "Mira el perfil de un usuario",
    ALIASES: "perfil",
    async execute(client, message, args, prefix, GUILD_DATA){

let member = message.mentions.users.first() || client.users.cache.get(args[0]) || message.author;

        const data = await profile.collection.find({ id: client.id })
        if (!data) {
            await profile.create({ id: client.id })
            return message.reply({
                embeds: [
                    new EmbedBuilder()
                        .setColor(process.env.COLOR)
                        .setAuthor({ name: `Perfil de ${member.tag}`, iconURL: member.displayAvatarURL({ dynamic: true})})
                        .addFields({name: "Insignias", value: `> No tienes insignias`},
                        {name: "Creación de la cuenta:", value: `> <t:${Math.floor(member.user.createdAt / 1000)}R>`})
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
            .addFields({name: "Insignias", value: `> ${badge}`},
            {name: "Creación de la cuenta:", value: `> <t:${Math.floor(member.createdAt / 1000)}:R>`})
            .setFooter({ text: `Perfil solicitado por ${message.member.user.tag}` })
            .setThumbnail(member.displayAvatarURL({ dynamic: true}))
        message.reply({ embeds: [embed] })
    },
};
