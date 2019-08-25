const fs = require('fs');
const moment = require('moment');

module.exports = (client) => {
    fs.readFile(`${__dirname}/../restart.json`, { encoding: 'utf-8' }, (err, data) => {
        if (err) {
            return console.log('Failed to do something to do with FS I guess')
        }

        if (!data) return;

        if (data && data !== '{}' || data !== '{ }') {
            let reData = require('../restart.json');
            let guild = client.guilds.get(reData.guildID);
            let channel = guild.channels.get(reData.channelID)
            let message = channel.fetchMessage(reData.messageID)
                .then(msg => {
                    msg.edit({
                        embed: {
                            color: 0x00ff00,
                            title: ':white_check_mark: Success!',
                            description: `This took \`${moment(new Date()).unix() - moment(reData.restarted).unix()} seconds\` `
                        }
                    })
                })
        }
    })
} // moment(the Date).format('MMMM Do YYYY, h:mm:ss a')