const profile = require('../../database/schemas/badges')
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, SlashCommandBuilder } = require ('discord.js')
module.exports = { 
    CMD: new SlashCommandBuilder()
    .setDescription("Da una insignia a un usuario")
    .addSubcommand(subcommand =>
		subcommand
			.setName('añadir')
			.setDescription('Añadir una insignia')
    .addUserOption(option =>
        option.setName("usuario")
        .setDescription("Usuario a dar insignia")
        .setRequired(true)
    )
    .addStringOption(option =>
        option.setName("insignia")
        .setDescription("Insignia a dar")
        .setRequired(true)
        .addChoices(                      {
            name: "Dueño",
            value: "owner"
        },
        {
            name: "Developer",
            value: "dev"
        },
        {
            name: "Staff",
            value: "staff"
        },
        {
            name: "Partidario Inicial`",
            value: "supporter"
        },
        {
            name: "Premium",
            value: "premium"
        })
        ))
        .addSubcommand(subcommand =>
            subcommand
                .setName('remover')
                .setDescription('Remover una insignia')
        .addUserOption(option =>
            option.setName("usuario")
            .setDescription("Usuario a dar insignia")
            .setRequired(true)
        )
        .addStringOption(option =>
            option.setName("insignia")
            .setDescription("Insignia a quitar")
            .setRequired(true)
            .addChoices(                      {
                name: "Dueño",
                value: "owner"
            },
            {
                name: "Developer",
                value: "dev"
            },
            {
                name: "Staff",
                value: "staff"
            },
            {
                name: "Partidario Inicial",
                value: "supporter"
            },
            {
                name: "Premium",
                value: "premium"
            })
            )),
        DEVELOPER: true,
        async execute(client, interaction, prefix, GUILD_DATA){

        const subcommand = interaction.options.getSubcommand()
        const badge = interaction.options.getString('insignia')
        const member = interaction.options.getUser('usuario')
        const data = await profile.findOne({ id: member.id })
        if (!data) await profile.create({ id: member.id })

        if (subcommand === "añadir") {
            if (badge === "owner") {
                const data = await profile.findOne({ id: member.id })
                if (data.badges.includes("owner")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(process.env.COLOR)
                            .setDescription(`<a:no:1015072569612828754> El usuario ya cuenta con esta insignia`)
                    ]
                })
                await data.badges.push('owner')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(process.env.COLOR)
                            .setDescription(`<a:yes:1029225889076092958> Se añadio la insignia **Dueño** al perfil de ${member}`)
                    ]
                })
            }
            if (badge === "dev") {
                const data = await profile.findOne({ id: member.id })
                if (data.badges.includes("dev")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(process.env.COLOR)
                            .setDescription(`<a:no:1015072569612828754> El usuario ya cuenta con esta insignia`)
                    ]
                })
                await data.badges.push('dev')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(process.env.COLOR)
                            .setDescription(`<a:yes:1029225889076092958> Se añadio la insignia **Developer** al perfil de ${member}`)
                    ]
                })
            }
            if (badge === "staff") {
                const data = await profile.findOne({ id: member.id })
                if (data.badges.includes("staff")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(process.env.COLOR)
                            .setDescription(`<a:no:1015072569612828754> El usuario ya cuenta con esta insignia `)
                    ]
                })
                await data.badges.push('staff')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(process.env.COLOR)
                            .setDescription(`<a:yes:1029225889076092958> Se añadio la insignia **Staff** al perfil de ${member}`)
                    ]
                })
            }
            if (badge === "premium") {
                const data = await profile.findOne({ id: member.id })
                if (data.badges.includes("premium")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(process.env.COLOR)
                            .setDescription(`<a:no:1015072569612828754> El usuario ya cuenta con esta insignia `)
                    ]
                })
                await data.badges.push('premium')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(process.env.COLOR)
                            .setDescription(`<a:yes:1029225889076092958> Se añadio la insignia **Premium** al perfil de ${member}`)
                    ]
                })
            }
            if (badge === "supporter") {
                const data = await profile.findOne({ id: member.id })
                if (data.badges.includes("supporter")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(process.env.COLOR)
                            .setDescription(`<a:no:1015072569612828754> El usuario ya cuenta con esta insignia`)
                    ]
                })
                await data.badges.push('supporter')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(process.env.COLOR)
                            .setDescription(`<a:yes:1029225889076092958> Se añadio la insignia **Partidario Inicial** al perfil de ${member}`)
                    ]
                })
            }
        }

        if (subcommand === "remover") {
            if (badge === "owner") {
                const data = await profile.findOne({ id: member.id })
                if (!data.badges.includes("owner")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(process.env.COLOR)
                            .setDescription(`<a:no:1015072569612828754> Este usuario no tiene esta insignia`)
                    ]
                })
                await data.badges.remove('owner')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(process.env.COLOR)
                            .setDescription(`<a:yes:1029225889076092958> Se removio la insignia **Dueño** del perfil de ${member}`)
                    ]
                })
            }
            if (badge === "dev") {
                const data = await profile.findOne({ id: member.id })
                if (!data.badges.includes("dev")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(process.env.COLOR)
                            .setDescription(`<a:no:1015072569612828754> Este usuario no tiene esta insignia`)
                    ]
                })
                await data.badges.remove('dev')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(process.env.COLOR)
                            .setDescription(`<a:yes:1029225889076092958> Se removio la insignia **Developer** del perfil de ${member}`)
                    ]
                })
            }
            if (badge === "staff") {
                const data = await profile.findOne({ id: member.id })
                if (!data.badges.includes("staff")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(process.env.COLOR)
                            .setDescription(`<a:no:1015072569612828754> Este usuario no tiene esta insignia`)
                    ]
                })
                await data.badges.remove('staff')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(process.env.COLOR)
                            .setDescription(`<a:yes:1029225889076092958> Se removio la insignia **Staff** del perfil de ${member}`)
                    ]
                })
            }
            if (badge === "premium") {
                const data = await profile.findOne({ id: member.id })
                if (!data.badges.includes("premium")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(process.env.COLOR)
                            .setDescription(`<a:no:1015072569612828754> Este usuario no tiene esta insignia`)
                    ]
                })
                await data.badges.remove('premium')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(process.env.COLOR)
                            .setDescription(`<a:yes:1029225889076092958> Se removio la insignia **Premium** del perfil de ${member}`)
                    ]
                })
            }
            if (badge === "supporter") {
                const data = await profile.findOne({ id: member.id })
                if (!data.badges.includes("supporter")) return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(process.env.COLOR)
                            .setDescription(`<a:no:1015072569612828754> Este usuario no tiene esta insignia`)
                    ]
                })
                await data.badges.remove('supporter')
                await data.save()
                return interaction.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setColor(process.env.COLOR)
                            .setDescription(`<a:yes:1029225889076092958> Se removio la insignia **Partidario Inicial** del perfil de ${member}`)
                    ]
                })
            }
        }

    }
}
