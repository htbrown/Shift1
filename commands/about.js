const fs = require('fs');

module.exports = async (client, message, args) => {
    let commands = [];
    fs.readdirSync('./commands/').forEach(f => {
        commands.push([f.substring(0, f.length-3), require(`./${f}`).info.description + `\nUsage: ${require(`./${f}`).info.usage}`]);
    });

    message.channel.send({
        embed: {
            author: {
                name: `Hey ${message.author.username}`,
                icon_url: message.author.avatarURL
            },
            thumbnail: {
                url: client.user.avatarURL
            },
            fields: [
                {
                    name: 'Servers',
                    value: client.guilds.size,
                    inline: true
                },
                {
                    name: 'Users',
                    value: client.users.size,
                    inline: true
                },
                {
                    name: 'Channels',
                    value: client.channels.size,
                    inline: true
                },
                {
                    name: 'Commands',
                    value: commands.length,
                    inline: true
                },
            ],
            color: 0x36393F
        }
    });
}

module.exports.info = {
    description: 'About Shift.',
    usage: 'about'
}
