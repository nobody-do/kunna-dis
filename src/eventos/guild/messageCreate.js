

module.exports = async (client, message) => {
  if (!message.guild || !message.channel || message.author.bot) return
  const GUILD_DATA = client.dbGuild.getGuildData(message.guild.id)

  if (!message.content.startsWith(GUILD_DATA.prefix)) return

  const ARGS = message.content.slice(GUILD_DATA.prefix.length).trim().split(/ +/)
  const CMD = ARGS?.shift()?.toLowerCase()

  const COMANDO = client.commands.get(CMD) || client.commands.find(c => c.ALIASES && c.ALIASES.includes(CMD))

  if (COMANDO) {
    if (COMANDO.OWNER) {
      if (!process.env.OWNER_IDS.split(' ').includes(message.author.id)) return message.reply(`❌ **Solo los dueños de este bot pueden ejecutar este comando!**\n**Dueños del bot:** ${process.env.OWNER_IDS.split(' ').map(OWNER_ID => `<@${OWNER_ID}>`)}`)
    }

    if (COMANDO.BOT_PERMISSIONS) {
      if (!message.guild.members.me.permissions.has(COMANDO.BOT_PERMISSIONS)) return message.reply(`❌ **No tengo suficientes permisos para ejecutar este comando!**\nNecesito los siguientes permisos ${COMANDO.BOT_PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(', ')}`)
    }

    if (COMANDO.PERMISSIONS) {
      if (!message.member.permissions.has(COMANDO.PERMISSIONS)) return message.reply(`❌ **No tienes suficientes permisos para ejecutar este comando!**\nNecesitas los siguientes permisos ${COMANDO.PERMISSIONS.map(PERMISO => `\`${PERMISO}\``).join(', ')}`)
    }

 
      if(message.content.match(new RegExp(`<@${client.user.id}>`)))
      {
        const tag1 = new EmbedBuilder()
        .setTitle("Ayuda")
        .setDescription(`
        Hola yo soy M9 Studio soy un bot multifuncional
        tratando de mejorar comandos y mas
        `)
        .addFields(
          {name: `Dueño`, value: ` <1114681584256286730>/n Id: 1114681584256286730 `},
          {name: `Prefix`, value: ` <k!> `},
          {name: `Help`, value:  ` **/help o !help**`}
        )
        .setColor("Red")
        .setTimestamp()
  
        message.reply({embeds: [tag1]})
    }
    
    
  
  //poner el prefix de tu bot 
    
  prefix = ["l!", "L!"]

  if (message.author.bot) return;
  if (message.channel.type == 'dm') return;

  if (message.content.startsWith(prefix[0]) || message.content.startsWith(prefix[1])) {
    client.api.channels(message.channel.id).typing.post();
  }
  

    try {
      // ejecutar el comando
      COMANDO.execute(client, message, ARGS, GUILD_DATA.prefix, GUILD_DATA)
    } catch (e) {
      message.reply(`**Ha ocurrido un error al ejecutar el comando \`${COMANDO.NAME}\`**\n*Mira la consola para más detalle.*`)
      console.log(e)
    }
  }
}
