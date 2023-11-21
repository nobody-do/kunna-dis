const { EmbedBuilder } = require('discord.js');
const configservers = require('../../database/schemas/GuildSchema');
module.exports = {
    name: 'prefijo',
    alias: ['prefix', 'setprefix', 'cambiarprefijo'],
    PERMISSIONS: ["Administrator"],
    BOT_PERMISSIONS: ["SendMessages", "ViewChannel"],

    async execute(client, message, args, prefix, GUILD_DATA) {
        if (!message.content.startsWith(prefix)) return;
        const newprefix = args[0]
        if (!newprefix) return message.channel.send({embeds: [new EmbedBuilder()
            .setDescription(':Warning: ¡No has especificado el nuevo prefijo!')    
            .setColor(process.env.COLOR)
        ]});
        if (newprefix.length > 5) return message.channel.send({embeds: [new EmbedBuilder()
            .setDescription(':prohibited: ¡El prefijo no puede tener mas de 5 caracteres!')
            .setColor(process.env.COLOR)
        ]}); 

        let data;
        try {
            data = await configservers.findOne({
                guildID: message.guild.id
            })
            if (!data) {
                let newdata = await configservers.create({
                    guildID: message.guild.id,
                    prefix: newprefix
                });
                newdata.save()
            } else {
                await configservers.findOneAndUpdate({
                    guildID: message.guild.id,
                    prefix: newprefix,
                });
            }
            message.channel.send({embeds: [new EmbedBuilder()
                .setDescription(`:_: ¡El prefijo ha sido cambiado de \`${prefix}\` a \`${newprefix}\`!`)
                .setColor(process.env.COLOR)
            ]})
        } catch (err) {
            console.log(err)
        }
    }
}