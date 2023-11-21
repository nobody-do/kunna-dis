const { EmbedBuilder } = require("discord.js");

module.exports = {
  NAME: "nuke", //esto lo pueden quitar ya que es de mi handler al igual que la linea de abajo
  USO: `v!nuke`,
  DESCRIPTION:
    "Elimina el canal y lo vuelve a crear, para borrar todo lo del canal y lo regresa vacio sin nada de lo anterior",
  ALIASES: [],
  PERMISSIONS: ["Administrator", "ManageChannels"],
  BOT_PERMISSIONS: ["Administrator", "ManageChannels"],

  async execute(client, message, args, prefix) {
    const posicion = message.channel.position;
    const gifUrl =
      "https://pa1.narvii.com/7749/97036f0ffec84959216580f00eb48d5fb9304c72r1-356-498_hq.gif"; //aqui el gif que quieran

    const mensaje = new EmbedBuilder()
      .setTitle("Este canal ha sido Nukeado")
      .setDescription(
        `Toda la información, los mensajes, archivos, hilos, etc. han sido eliminados. \n\n Acción hecha por: \`${message.author.username}\``
      )
      .setImage(gifUrl)
      .setTimestamp();

    message.channel.clone().then((canal) => {
      message.channel.delete();
      canal.setPosition(posicion);
      canal.send({ embeds: [mensaje] });
    });

   
  },
};