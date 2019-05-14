module.exports = async (client, message, args) => {
    let verifLev;
    switch (message.guild.verificationLevel) {
        case 0:
            verifLev = 'None';
            break;
        case 1:
            verifLev = 'Verified Email (Low)';
            break;
        case 2:
            verifLev = 'Registered for 5+ min (Medium)';
            break;
        case 3:
            verifLev = 'Member for 10+ min (High)';
            break;
        case 4:
            verifLev = 'Verified phone number (Very High)';
            break;
    }

    let iconURL;
    if (message.guild.iconURL) {
        iconURL = message.guild.iconURL.replace('jpg', 'png');
    } else {
        iconURL = client.user.avatarURL;
    }

    message.channel.send({
        embed: {
            author: {
                name: `Hey ${message.author.username}`,
                icon_url: message.author.avatarURL
            },
            thumbnail: {
                url: iconURL
            },
            description: `Here's what I found on ${message.guild.name}.`,
            color: 0x36393F,
            fields: [
                {
                    name: 'ID',
                    value: message.guild.id,
                    inline: true
                },
                {
                    name: 'Members',
                    value: message.guild.memberCount,
                    inline: true
                },
                {
                    name: 'Verification Level',
                    value: verifLev,
                    inline: true
                },
                {
                    name: 'Created on',
                    value: message.guild.createdAt,
                    inline: true
                },
                /*
                {
                    name: 'Joined on',
                    value: jeff,
                    inline: true
                },
                {
                    name: 'Status',
                    value: message.guild.member(user).presence.status,
                    inline: true
                },
                */
            ]
        }
    })
};

module.exports.info = {
	description: 'Finds information on the current server.',
    usage: 'serverinfo'
};