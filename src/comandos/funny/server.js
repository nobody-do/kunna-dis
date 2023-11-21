const { EmbedBuilder } = require("discord.js");
module.exports = {
    DESCRIPTION: 'muestra la lista de servidores con las Ids de los servidor en los que esta tu bot',
    execute(client, message, args) {
       
      const serverslist= client.guilds.cache.map(guild => `> **-** ${guild.name} \`(ID: ${guild.id})\``);
      const embed = new EmbedBuilder()
      .setTitle("lista de servidores")
      .setDescription(`El bot se encuentra en los siguientes servidores:\n${serverslist.join('\n')}`)
      .setColor("Random")
      message.channel.send({ embeds: [embed] });
    },
  };