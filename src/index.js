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
    if (message.content === 'u cute') {
        message.reply('no u')
    return;
    }
    if(message.author.bot) {
    return;
    }
    if (message.content === 'no u') {
        message.reply('no, u')
    return;
    }
    if (message.content === 'no u') {
        message.reply('no, ur mum')
    return;
    }
    if (message.content === 'hello') {
        message.reply('heya nerd <3')
    return;
    }
    if (message.content === 'hi') {
        message.reply('yooo')
    return;
    }
    if (message.content === 'hii') {
        message.reply('yohoo')
    return;
    }
    if (message.content === 'thanks') {
        message.reply('no problem!')
    return;
    }
    if (message.content === 'ty') {
        message.reply('np!')
    return;
    }
    if (message.content === 'tnx') {
        message.reply('no problem!')
    return;
    }
    if (message.content === '❤️') {
        message.reply('❤️')
    return;
    }
});

client.login(process.env.TOKEN);
