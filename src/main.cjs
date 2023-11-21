const Discord = require('discord.js')
const client = new Discord.Client({
  ws: [
    Discord.GatewayIntentBits.GuildPresences,
    Discord.IntentsBitField.Flags.GuildPresences
  ]
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})


const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

client.login('1122326924207857737')
