const { ChatInputCommandInteraction, SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");
const economia = require('../../database/schemas/work')

module.exports = {
  CMD: new SlashCommandBuilder()
  .setName("work")
  .setDescription("Comando para trabajar"),
  
  /**
   *
   * @param {ChatInputCommandInteraction} interaction
   * @param {Client} client
   */
   
  async execute(client, interaction) {
  
    //recompensa del work
    let recompesa = Math.floor(Math.random() * 350) + 1;

    try{
    const data = await economia.findOne({
        userID: interaction.user.id,
        guildID: interaction.guild.id
    });

    // si el usuario no tiene data creamos una
    if(!data){
        const data = await economia.create({
            userID: interaction.user.id,
            guildID: interaction.guild.id,
            money: 100,
            bank: 0
        });
    };

    // Se le da el dinero a el usuario por trabajar
   await economia.findOneAndUpdate({userID: interaction.user.id, guildID: interaction.guild.id}, {
    $inc: {
        money: +recompesa
    }
   })
   
   // trabajos si quieren ponene mas
   var trabajos = [
    "Piloto",,
    "Desarrollador",
    "Protitut@"
    ];
    
    // se pone el trabajo random
    let randomTrabajo = trabajos[(Math.floor(Math.random() * trabajos.length))]

    //el embed
    let embed = new EmbedBuilder()
    .setAuthor({iconURL: `${interaction.user.displayAvatarURL()}`, name: `${interaction.user.tag}`})
    .setDescription(`Te dieron <:paypal:930783872734625813> ${recompesa} por trabajar de *${randomTrabajo}*`)
    .setColor("Green")

    //mandamos el embed
    interaction.reply({ embeds: [embed], allowedMentions: { repliedUser: false }})


    }catch(err){
        console.log("El Comando Work Fallo ", err)
        interaction.reply({ text:"El Comando Work Fallo", ephemeral:true})
    }


  },
};
