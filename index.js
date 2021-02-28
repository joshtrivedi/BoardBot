const {
    prefix,
    token,
    youtube_link,
} = require('./config.json')
const Discord = require('discord.js')
const bot = new Discord.Client()
const polls = require('./polls')
const fs = require('fs')
const testing = require('./testing')
bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'))
for(const file of commandFiles){
    const command = require(`./commands/${file}`)

    bot.commands.set(command.name, command);
}

bot.on('ready', () =>{
    console.log('Board bot is online')
    polls(bot)
    testing(bot)
})

bot.on('message',msg=>{
    const args = msg.content.slice(prefix.length).split(/ +/)
    const command = args.shift().toLowerCase()
    if(command === "ping"){
        bot.commands.get('ping').execute(msg, args)
    }else if(command === "youtube" || command === "yt"){
        bot.commands.get('youtube').execute(msg, args, youtube_link)
    }
})
bot.login(token)