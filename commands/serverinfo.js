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
    if (!message.guild.iconURL) {
        iconURL = client.user.avatarURL;
    } else {
        iconURL = message.guild.iconURL.replace('jpg', 'png');
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
                {
                    name: 'Owner',
                    value: message.guild.owner.user.tag,
                    inline: true
                },
                {
                    name: 'Channels',
                    value: message.guild.channels.filter(c => c.type !== 'category').size,
                    inline: true
                },
            ]
        }
    })
};

module.exports.info = {
	description: 'Finds information on the current server.',
    usage: 'serverinfo'
};