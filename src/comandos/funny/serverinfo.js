const Discord = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, SelectMenuBuilder } = require('discord.js')

module.exports = {
  name: "server-in",
  alias: ["sv-info"],
  desc: "Ve Informacion del servidor",
async execute (client, message, args) {

    const row = new ActionRowBuilder()
    .addComponents(
        new SelectMenuBuilder()
        .setPlaceholder(`Hola, Selecciona una opcion porfavor!`)
        .setCustomId("mhelp")
        .setOptions([
            {
                value: "inicio",
                label: "Informacion del server",
                description: "Las informaciones del server",
                emoji: "💫" 
            },
            {
               value: "emojis",
               label: "Los emojis",
               description: "Revisa los emojis del servidor",
               emoji: "😂"
            },
            {
              value: "role",
              label: "Los Roles",
              description: "Revisa los roles del servidor",
              emoji: "💯"
           }
  
        ])
  
        
    )
  
  // Embeds
  
  const guild = message.guild

  const inicio = new EmbedBuilder()
  
  .addFields([
    {name: `Dueño`, value: `> <@${guild.ownerId}>`, inline: true},
    {name: `ID`, value: `> \`${guild.id}\``, inline: true},
    {name: `Canales`, value: `> ${guild.channels.cache.size}`, inline: true},
    {name: `Todos los miembros`, value: `> ${guild.memberCount} / ${guild.maximumMembers}`, inline: true},
    {name: `Creado el`, value: `> <t:${guild.createdTimestamp}>`, inline: true},
    {name: `Entraste`, value: `> <t:${guild.joinedTimestamp}>`, inline: true},
    {name: `Maximum Bitrate`, value: `> \`${guild.maximumBitrate}\``, inline: true},
    {name: `Boosts`, value: `> \`${guild.premiumSubscriptionCount}\``, inline: true}
  ])
  .setColor("Red")

  if(guild.afkChannel) inicio.addFields({name: `Canal afk`,value: `> ${guild.afkChannel}`, inline: true})
  if(guild.banner) inicio.setImage(guild.banner)
  if(guild.rulesChannel) inicio.addFields({name: `Reglas`, value: `> ${guild.rulesChannel}`, inline: true})
  if(guild.nsfwLevel < 50) inicio.addFields({name: `Nivel de NSFW`, value: `> \`Default\``, inline: true })
  if(guild.nsfwLevel === 50) inicio.addFields({name: `Nivel de NSFW`, value: `> \`Normal\``, inline: true })
  if(guild.nsfwLevel > 50) inicio.addFields({name: `Nivel de NSFW`, value: `> \`Advanced\``, inline: true })
  if(guild.description) inicio.addFields({name: `Descripcion`, value: `> ${guild.description}`, inline: true})
  
  const iic = new EmbedBuilder()
  .setTitle("😂 | Emojis")
  .setDescription(`${guild.emojis.cache.sort((a, b) => b.rawPosition - a.rawPosition).map(r => r.toString()).join(" ")})`)
  .setColor("Green")

  const ic = new EmbedBuilder()
  .setTitle(`💯 | Roles [${guild.roles.cache.size}]`)
  .setDescription(`${guild.roles.cache.sort((a, b) => b.rawPosition - a.rawPosition).map(r => r.toString()).join(" ' ")}`)
  .setColor("Green")
    const m = await message.channel.send({ embeds: [inicio], components: [row]})
  
    const ifilter = i => i.user.id === message.author.id;
  
    const collector = m.createMessageComponentCollector({ filter: ifilter}) 
  
    collector.on("collect", async suge=> {
        if(suge.values[0] === "inicio"){
          await suge.deferUpdate()
       return suge.editReply({ embeds: [inicio], ephemeral: true})
        }
      })
    
      collector.on("collect", async suge=> {
        if(suge.values[0] === "emojis"){
          await suge.deferUpdate()
       return suge.editReply({ embeds: [iic], ephemeral: true})
        }
      })

      collector.on("collect", async suge=> {
        if(suge.values[0] === "role"){
          await suge.deferUpdate()
       return suge.editReply({ embeds: [ic], ephemeral: true})
        }
      })
  }

}