const Discord = require('discord.js');

module.exports = {
  name: "clear", 
  alias: ["eliminar"], 

execute (client, message, args){

        const perms = message.member.permissions.has("MANAGE_MESSAGES")
      
        if (!perms) return message.channel.send({ embeds: [{ description: "❌ | **Permisos insuficientes**\n\nTe faltan los siguientes permisos: `MANAGE_MESSAGES` ", color: `FF0000`}] })
      
        const botperms = message.guild.me.permissions.has("MANAGE_MESSAGES")
      
        if (!botperms) return message.channel.send({ embeds: [{ description: "❌ | **Permisos insuficientes**\n\nMe faltan los siguientes permisos: `MANAGE_MESSAGES` ", color: `FF0000`}] })

        const valor = parseInt(args[0]);
  
        if(!valor) return message.channel.send({ embeds: [{ description: "❌ | **Error**\n\nDebes escribir al menos un numero de mensajes para borrar", color: `FF0000`}] })
  
        if(valor >= 100) return message.channel.send({ embeds: [{ description: "❌ | **Error**\n\nEl digito no puede ser mayor a __99__", color: `FF0000`}] })

        message.channel.bulkDelete(valor + 1, true);
  
        const ClearCommandembed = new Discord.MessageEmbed()
       .setTitle('🧹 __CLEAR__ 🧹')
       .setDescription(`Se han eliminado una cantidad de ${valor} de mensajes`)
       .setImage("https://c.tenor.com/OOyWCR2DueYAAAAS/clean-cleaning.gif")
       .setColor("#4D00FF")
  
        message.channel.send({ embeds: [ClearCommandembed] }).then((msg) => {
    setInterval(() => { msg.delete() }, 5000);
  });
  
 }
} 