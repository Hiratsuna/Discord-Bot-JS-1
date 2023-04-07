require('dotenv').config();
const { Client, IntentsBitField } = require('discord.js');

const client = new Client({
    intents: [
        IntentsBitField.Flags.Guilds,
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.MessageContent,
    ]
})

client.on ('ready', (c) => {
    console.log(`🤡 ${c.user.tag} is ready, nerds!`)
})

client.on('messageCreate', (message) => {

    if(message.author.bot) {
        return;
    }
    if (message.content === 'u gay') {
    message.reply('no u')
    return;
    }
    if(message.author.bot) {
        return;
    }
    if (message.content === 'no u') {
    message.reply('no, ur mum')
    return;
    }
});

client.login(process.env.TOKEN);