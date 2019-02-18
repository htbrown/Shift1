///////////////////////////////////
//     Shift by Hayden Brown     //
//            v1.0.0             //
//  Copyright Hayden Brown 2019  //
///////////////////////////////////

const Discord = require('discord.js'), enmap = require('enmap'), log = require('hexalogger'), config = require('./config.json'), package = require('./package.json'), fs = require('fs');
const level = require('enmap-level');

const client = new Discord.Client();

client.data = enmap.multi(['guilds', 'users'], level);

const webserver = require('./web/webserver.js');
webserver.boot();

log.info('Getting ready...');
function sleep(milliseconds) {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
        if ((new Date().getTime() - start) > milliseconds){
            break;
        }
    } // or i have a better solution
}

client.on('ready', () => {
    var status = 0;
    client.setInterval(() => {
        switch(status) {
            case 0:
                client.user.setActivity(`${client.guilds.size} servers.`, { type: 3 }); //watching
                status++
                break;
            case 1:
                client.user.setActivity(`my code go by.`, { type: 3 }); //watching
                status++
                break;
            case 2:
                client.user.setActivity(`${config.prefix}help`);
                status++
                break;
            default:
                client.user.setActivity(`Shift | v${package.version}`);
                status = 0;
        }
    }, 10000);
    log.success(`Successfully logged into Discord with the tag: ${client.user.tag}.`);
    log.success('Ready.');
    log.ascii('ShiftBot');
    if (client.guilds.size === 0) return log.warn(`This Discord bot isn't in any servers! Invite it using this link: https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot`);
    client.util = {};
    fs.readdirSync('./modules').forEach(u => {
        let util = u.split('.js')[0];
        client.util[util] = require(`./modules/${u}`);
        log.success(`${util} loaded successfully.`)
    });
});

client.on('guildMemberAdd', (member) => {
    if (!client.data.guilds.get(member.guild.id)) {
        client.data.guilds.set(member.guild.id, config.defaultGuildDB);
    };
    if (client.data.guilds.get(member.guild.id).welcomeMessages === false) return;
    let channel = client.data.guilds.get(member.guild.id).welcomeChannel;
    let guild = member.guild;
    if (guild.channels.find('name', channel)) {
        let guildChannel = guild.channels.find('name', channel);
        let final_msg = client.data.guilds.get(guild.id).welcomeMsg.replace('{user}', member.user.tag).replace('{server}', guild.name);
        guildChannel.send({
            embed: {
                author: {
                    name: `Hey ${member.user.username}`,
                    icon_url: member.user.avatarURL
                },
                description: final_msg,
                color: 0x36393F,
                footer: {
                    text: `v${package.version}`
                } 
            }
        })
    } else {
        guild.owner.send({
            embed: {
                author: {
                    name: `Hey ${guild.owner.user.username}`,
                    icon_url: guild.owner.user.avatarURL
                },
                description: 'Seems like your welcome message channel isn\'t quite right. If you need help, join the support server which can be found in the info command.',
                color: 0x36393F,
                footer: {
                    text: `v${package.version}`
                } 
            }
        })
    }
}) // New Member

client.on('guildMemberRemove', (member) => {
    if (!client.data.guilds.get(member.guild.id)) {
        client.data.guilds.set(member.guild.id, config.defaultGuildDB);
    };
    if (client.data.guilds.get(member.guild.id).leaveMessages === false) return;
    let channel = client.data.guilds.get(member.guild.id).leaveChannel;
    let guild = member.guild;
    if (guild.channels.find('name', channel)) {
        let guildChannel = guild.channels.find('name', channel);
        let final_msg = client.data.guilds.get(guild.id).leaveMsg.replace('{user}', member.user.tag).replace('{server}', guild.name);
        guildChannel.send({
            embed: {
                author: {
                    name: `Bye ${member.user.username}`,
                    icon_url: member.user.avatarURL
                },
                description: final_msg,
                color: 0x36393F,
                footer: {
                    text: `v${package.version}`
                } 
            }
        })
    } else {
        guild.owner.send({
            embed: {
                author: {
                    name: `Hey ${guild.owner.user.username}`,
                    icon_url: guild.owner.user.avatarURL
                },
                description: 'Seems like your leave message channel isn\'t quite right. If you need help, join the support server which can be found in the info command.',
                color: 0x36393F,
                footer: {
                    text: `v${package.version}`
                } 
            }
        })
    }
}) // Member Leave

client.on('message', (message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm") return;
    if (!client.data.guilds.get(message.guild.id)) {
        client.data.guilds.set(message.guild.id, config.defaultGuildDB);
    };
    prefix = client.data.guilds.get(message.guild.id).prefix;
    if (message.content === client.user.toString()) client.util.embed(client, message, `The prefix for this server is \`${prefix}\`. Honestly, what ya' like? Fancy forgetting the prefix for the server. *tut*`)
    if (!message.content.startsWith(prefix)) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    try {
        const cmdFile = require(`./commands/${command}`);
        if (cmdFile) {
            cmdFile(client, message, args);
        }
        log.info(`${message.author.tag} has executed the ${command} command in ${message.guild.name}`);
    } catch (err) {
        log.warn(`${message.author.tag} just tried to execute a command that doesn't exist!`);
    }
});

client.login(config.token);