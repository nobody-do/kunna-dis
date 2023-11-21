const {
    SlashCommandBuilder,
    EmbedBuilder,
    ActionRowBuilder,
    StringSelectMenuBuilder,
  } = require(`discord.js`);
  const Discord = require(`discord.js`);
  const fs = require(`fs`);
  
  module.exports = {
    CMD: new SlashCommandBuilder()
      .setName("help")
      .setDescription("📉 | Mira todos mis comandos disponibles"),
  
    async execute(client, interaction) {
      const cmp = new ActionRowBuilder().addComponents(
        new StringSelectMenuBuilder().setCustomId("Menu").addOptions([
          {
            label: "Menu",
            description: "Menu.",
            value: "princi",
            emoji: "📊",
          },
          {
            label: "Informacion",
            description: "Comandos Informaticos.",
            value: "Opcion_1",
            emoji: "⚙️",
          },
          {
            label: "Moderacion",
            description: "Comandos Moderacion.",
            value: "moderación",
            emoji: "⛔",
          },
          {
            label: "Diversion",
            description: "Comandos Divertidos.",
            value: "interacción",
            emoji: "🍌",
          },
          {
            label: "Owner",
            description: "Comandos del Owner",
            value: "owner",
            emoji: "👑",
          },
        ])
      );
      const user = interaction.user;
  
      const embed = new EmbedBuilder()
        .setTitle("Menu")
        .setThumbnail("https://cdn.discordapp.com/attachments/947024057084284938/1070767492718407751/LOGO_FIRE.NET.jpg")
        .setColor(0xFF0000)
        .setDescription(`**Seleccione las opciones del SelectMenu que estan abajo.**`);
  
      let mensaje = await interaction.reply({
        embeds: [embed],
        components: [cmp],
      });
  
      const filtro = (i) => i.user.id === interaction.user.id;
      user.id;
  
      let collector = interaction.channel.createMessageComponentCollector({
        filter: filtro,
      });
  
      const embed1 = new EmbedBuilder()
        .setTitle("Comandos Informacion")
        .setDescription("`Lista de Comandos:` \n\n**/avatar** \n**/botinfo** \n**/serverinfo** \n**/userinfo** \n**/help** \n**/uptime** \n\n")
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/947024057084284938/1070767492718407751/LOGO_FIRE.NET.jpg"
        )
        .setFooter({ text: "FIRE.MC" })
        .setTimestamp()
        .setColor(0xFF0000);
  
      const embed2 = new EmbedBuilder()
        .setTitle("Comandos Moderacion")
        .setDescription(
          "`Lista de Comandos:` \n\n**/timeout**\n**/removetimeout** \n**/ban** \n**/unban** \n**/kick** \n**/mute** \n**/unmute** \n**/anuncio** \n**/clear** \n**/encuesta** \n\n"
        )
        .setThumbnail(
            "https://cdn.discordapp.com/attachments/947024057084284938/1070767492718407751/LOGO_FIRE.NET.jpg"
        )
        .setFooter({ text: "FIRE.MC" })
        .setTimestamp()
        .setColor(0xFF0000);
  
      const embed3 = new EmbedBuilder()
        .setTitle("Comandos Diversion")
        .setDescription("`Lista de Comandos:` \n\n**/cry** \n**/kiss** \n**/memes** \n**/say** \n**/ping** \n\n")
        .setThumbnail(
            "https://cdn.discordapp.com/attachments/947024057084284938/1070767492718407751/LOGO_FIRE.NET.jpg"
        )
        .setFooter({ text: "FIRE.MC" })
        .setTimestamp()
        .setColor(0xFF0000);
  
        const embed4 = new EmbedBuilder()
        .setTitle("Comandos del Owner")
        .setDescription("`Lista de Comandos:` \n\n**/setstatus** \n**/status** \n**/links-oficiales** \n\n")
        .setThumbnail(
          "https://cdn.discordapp.com/attachments/947024057084284938/1070767492718407751/LOGO_FIRE.NET.jpg"
        )
        .setFooter({ text: "FIRE.MC" })
        .setTimestamp()
        .setColor(0xFF0000);

      collector.on("collect", async (i) => {
        if (i.values[0] === "princi") {
          await i.deferUpdate();
          i.editReply({ embeds: [embed], components: [cmp] });
        }
      });
  
      collector.on("collect", async (i) => {
        if (i.values[0] === "Opcion_1") {
          await i.deferUpdate();
          i.editReply({ embeds: [embed1], components: [cmp] });
        }
      });
  
      collector.on("collect", async (i) => {
        if (i.values[0] === "moderación") {
          await i.deferUpdate();
          i.editReply({ embeds: [embed2], components: [cmp] });
        }
      });
  
      collector.on("collect", async (i) => {
        if (i.values[0] === "interacción") {
          await i.deferUpdate();
          i.editReply({ embeds: [embed3], components: [cmp] });
        }
      });
      
      collector.on("collect", async (i) => {
        if (i.values[0] === "owner") {
          await i.deferUpdate();
          i.editReply({ embeds: [embed4], components: [cmp] });
        }
      });
    },
  };