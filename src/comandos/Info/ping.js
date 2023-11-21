const Discord = require('discord.js');

module.exports = {
    name: 'ping',
    alias: [],

    execute: async (client, message, args) => {

        const EmbedPing = new Discord.EmbedBuilder()
        .setTitle('🏓 ¡Pong!')
        .setDescription(`*Mi ping es de* **\`${client.ws.ping}ms\`**`)
        .setColor("DarkRed")

        const EmbedCal = new Discord.EmbedBuilder()
        .setDescription('`Calculando mi ping`')
        .setColor('Yellow')

        const replyMessage = await message.reply({ embeds: [EmbedCal], allowedMentions: { repliedUser: false } });
        const dots = ['.', '..', '...'];

        const showDots = (count) => {
            setTimeout(() => {
                EmbedCal.setDescription(`\`Calculando mi ping${dots[count % 3]}\``);
                replyMessage.edit({ embeds: [EmbedCal] });
                if (count < 5) {
                    showDots(count + 1);
                } else {
                    setTimeout(() => {
                        replyMessage.edit({ embeds: [EmbedPing] });
                    }, 500); 
                }
            }, 500);
        };

        showDots(0);
    }
} 