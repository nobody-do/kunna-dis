const { ChatInputCommandInteraction, EmbedBuilder, Client } = require("discord.js")

module.exports = {
    name: "embed",
    description: "Generar embed personalizado!",
    UserPerms: ["Administrator"],
    BotPerms: ["Administrator"],
    options: [
        {
            name: "generar",
            description: "Generar un embed personalizado!.",
            type: 1, // 1 = Subcommand
            options: [
                {
                     name: "color", 
                     description: "Proporciona color al embed.", 
                     type: 3, // 3 = String
                },
                { 
                    name: "titulo", 
                    description: "Proporciona titulo al embed.", 
                    type: 3, // 3 = String
                },
                { 
                    name: "url", 
                    description: "Proporciona url al embed.", 
                    type: 3, // 3 = String
                },
                { 
                    name: "autor", 
                    description: "Proporciona autor al embed.", 
                    type: 3, // 3 = String
                },
                { 
                    name: "autoricono", 
                    description: "Proporciona icono al autor del embed.", 
                    type: 3, // 3 = String
                },
                { 
                    name: "autorurl", 
                    description: "Proporciona url al autor del embed.", 
                    type: 3, // 3 = String
                },
                { 
                    name: "descripcion", 
                    description: "Proporciona descripcion al embed.", 
                    type: 3, // 3 = String
                },
                { 
                    name: "thumbnail", 
                    description: "Proporciona thumbnail al embed.", 
                    type: 3, // 3 = String
                },
                {
                     name: "imagen", 
                     description: "Proporciona imagen al embed.", 
                     type: 3, // 3 = String
                },
                { 
                    name: "timestamp", 
                    description: "Activar timestamp?", 
                    type: 5, // 5 = Boolean
                },
                { 
                    name: "footer", 
                    description: "Proporciona footer al embed.", 
                    type: 3, // 3 = String
                },
                { 
                    name: "footericono", 
                    description: "Proporciona icono al footer del embed.", 
                    type: 3, // 3 = String
                },
                { 
                    name: "fields", 
                    description: "nombre*valor*inline (true o false)**", 
                    type: 3, // 3 = String
                },
            ],
        },
        {
            name: "ayuda",
            description: "Tutorial sobre el uso de /embed generar.",
            type: 1, // 1 = Subcommand
        },
    ],
    
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @param {Client} client
     */
    async execute(interaction, client) {

        try {

        //await interaction.deferReply();

        const { options } = interaction;
        // Obtener el subcomando seleccionado
         const subcomando = interaction.options.getSubcommand();

        switch(subcomando) {
            case "generar":
                const eFields     = [[], [], []];
                const splitFields = [];

                
                const color       = options.getString("color");
                const titulo      = options.getString("titulo");
                const url         = options.getString("url");
                const autor       = options.getString("autor");
                const autoricono  = options.getString("autoricono");
                const autorurl    = options.getString("autorurl");
                const descripcion = options.getString("descripcion");
                const thumbnail   = options.getString("thumbnail");
                const imagen      = options.getString("imagen");
                const timestamp   = options.getBoolean("timestamp");
                const footer      = options.getString("footer");
                const footericono = options.getString("footericono");
                let   fields      = options.getString("fields");

                const error = new EmbedBuilder()
                if(!titulo && !descripcion && !fields) {
                    error.setColor(client.color)
                    error.setDescription("No has proporcionado opciones válidas!")
                 return interaction.reply({ embeds: [error], ephemeral: true });
                } 

                const embed = new EmbedBuilder();

                if(url && url.includes("http"))             embed.setURL(`${url}`);
                if(thumbnail && thumbnail.includes("http")) embed.setThumbnail(`${thumbnail}`);
                if(imagen && imagen.includes("http"))       embed.setImage(`${imagen}`);
                if(color)                                   embed.setColor(`${color}`);
                if(!color)                                  embed.setColor(client.color);
                if(titulo)                                  embed.setTitle(`${titulo}`);
                if(autor)                                   embed.setAuthor({ name: `${autor}`, iconURL: `${autoricono}`, url: `${autorurl}` });
                if(descripcion)                             embed.setDescription(`${descripcion}`);
                if(timestamp)                               embed.setTimestamp();
                if(footer)                                  embed.setFooter({ text: `${footer}`, iconURL: `${footericono}` });
                if(fields) {
                    fields = fields.split("*");
                    fields.forEach(e => {
                        if(e.length > 0) {
                            splitFields.push(e.trim())
                        }
                    });
            
                    let x = 0;
                    for (let i = 0; i < splitFields.length; i++) {
                        if(x == 3) x = 0;
                        eFields[x].push(splitFields[i]);
                        x++;
                    }
                        
                    for (let i = 0; i < eFields[0].length; i++) {
                        embed.addFields({name: `${eFields[0][i]}`, value: `${eFields[1][i]}`, inline: JSON.parse(eFields[2][i].toLowerCase())});
                    }
                } 

                    interaction.reply({ embeds: [embed] });

            break;

            case "ayuda":
                const ayuda = new EmbedBuilder()
                    .setTitle("/Embed Ayuda")
                    .setColor("Green")
                    .setDescription("Para enviar una incrustación debe proporcionar al menos un título, una descripción o un campo.\n\nLa mayoría de los comandos son bastante autoexplicativos, excepto el comando de los campos.\nPara enviar los campos debe seguir el siguiente formato:\n\n`nombre*valor*inline**`\n\nPo ejemplo, enviando `Nombre*Nica*true** Edad*18*true** Interes*Nica, Juegos y Codigos*false**` enviaría:")
                    .addFields(
                        {name: "Nombre", value: "Nica", inline: true},
                        {name: "Edad", value: "16", inline: true},
                        {name: "Interes", value: "Nica, Juegos y Codigos", inline: false}
                    )
                    .setTimestamp()
                    .setFooter({ text: `Nicaina Team`, iconURL: `https://i.imgur.com/Ot0En1l.gif` })

                interaction.reply({ embeds: [ayuda], ephemeral: true })

            break;
        }
            
        } catch (error) {
            console.log(error)
        }

    }

}