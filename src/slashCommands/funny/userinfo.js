const {SlashCommandBuilder, EmbedBuilder} = require('discord.js');

module.exports = {
    CMD: new SlashCommandBuilder()
    .setDescription("Show the information of your profile or the profile of an other user.")
    .addUserOption((option) => option.setName('user').setDescription('Specify de member to see his information.')),
    
    execute(client, interaction, prefix, GUILD_DATA){

        const member = interaction.options.getUser('user');
        const user = interaction.user;

        if (member){
            
            interaction.reply({
                embeds: [
                    new EmbedBuilder()
                        .setTitle('USER INFORMATION')
                        .setDescription(`**Name:** ${member.username}\n**Discriminator:** ${member.discriminator}\n**ID:** ${member.id}\n**Bot:** ${member.bot}\n**Created Account:** ${member.createdAt}`)
                        .setColor(process.env.COLOR)
                        .setThumbnail(`${member.displayAvatarURL({ size: 256, dynamic: true })}`)
                ]
            });

        } else {
            interaction.reply({
            embeds: [
                new EmbedBuilder()
                    .setTitle('USER INFORMATION')
                    .setDescription(`**Name:** ${user.username}\n**Discriminator:** ${user.discriminator}\n**ID:** ${user.id}\n**Bot:** ${user.bot}\n**Created Account:** ${user.createdAt}`)
                    .setColor(process.env.COLOR)
                    .setThumbnail(`${user.displayAvatarURL({ size: 256, dynamic: true })}`)
                ]
            })
        }
    }
}