const config = require('../config.json');
module.exports = async (client, message, args) => {
    if (!config.maintainers.includes(message.author.id)) return client.util.embed(client, message, '*Oi!* You\'re not supposed to be here! Get lost!', 'red');
    try {
        message.channel.send({
            embed: {
                description: 'Restarting... This may take a bit!',
                color: 0x36393F,
                footer: {
                    text: 'If this action failed, an error message will be sent.'
                }
            }
        }).then(ctx => {
            const fs = require('fs');
            fs.writeFile(`${__dirname}/../restart.json`, `{ "restarted": "${new Date()}", "messageID": "${ctx.id}", "guildID": "${message.guild.id}", "channelID": "${message.channel.id}" }`, (err) => {
                if (err) {
                    return console.log(err);
                }

                console.log('SAVED RESTART.JSON')
            }); 

            setTimeout(() => {
                require('child_process').execSync('pm2 restart Shift')
            }, 1000)
        })
    } catch (err) {
        client.util.embed(client, message, `Seems like something's gone wrong with your code. Here's what I returned. \n\`\`\`${err}\`\`\``, 'red');
    }
}

module.exports.info = {
    description: 'Restarts the bot.',
    usage: 'restart'
}