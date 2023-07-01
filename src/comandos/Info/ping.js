const { EmbedBuilder } = require('discord.js');
const Discord = require("discord.js");

module.exports = {
  DESCRIPTION: 'Mira el ping del bot',
  async execute (client, message, args, prefix, GUILD_DATA) {
    const embed = new Discord.EmbedBuilder()
    .setColor("Random")
    .setTitle(`mi ping actual es ${client.ws.ping} MS`)
    .setImage("https://i.pinimg.com/564x/c4/87/bc/c487bc5ad5e0a7da879da8343bb18c97.jpg")
    .addFields(
      { name: '**Hola! Gracias por invitarme a tu servidor!**', value: '**Este bot esta en dessarollo asi que.. Necesitamos Dev y staff para el soporte**' },
      { name: '\u200B', value: '\u200B' },
      { name: 'Soporte: ', value: 'https://discord.gg/GrrH7WpWpK', inline: true },
      { name: 'Inline field title', value: 'Unete a Forg :DD', inline: true },
    )  
    message.reply({ embeds: [embed] })
  }
}