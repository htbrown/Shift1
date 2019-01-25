const fs = require('fs'), package = require('../package.json');
module.exports = async (client, message, args) => {
    let commands = [];
    fs.readdirSync('./commands/').forEach(f => {
        commands.push([f.substring(0, f.length-3), require(`./${f}`).info.description + `\nUsage: ${require(`./${f}`).info.usage}`]);
    });
    message.channel.send({embed: {
        author: {
            name: `Hey ${message.author.username}`,
            icon_url: message.author.avatarURL
        },
        description: 'Check your DMs.',
        color: 0x36393F,
        footer: {
            text: `v${package.version}`
        }
    }});
    message.author.send({embed: {
        author: {
            name: `Hey ${message.author.username}`,
            icon_url: message.author.avatarURL
        },
        title: 'Help',
        color: 0x36393F,
        fields: commands.map(function(c) {return {name: c[0], value: c[1]}}),
        footer: {
            text: `() = Optional [] = Required | ${commands.length} commands`
        }
    }})
}

module.exports.info = {
    description: 'Shows help for the bot.',
    usage: 'help'
}