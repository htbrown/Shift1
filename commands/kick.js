const package = require('../package.json');

module.exports = async (client, message, args) => {
    const kickUser = message.mentions.members.first();
    var reason = args.slice(1).join(" ");

    if(!message.member.hasPermission("KICK_MEMBERS")) return client.util.embed(client, message, 'You do not have permission to use this command. If this is an error, make sure you have the \'Kick Members\' permission.', 'red');
    if (!kickUser) return client.util.embed(client, message, 'You need to mention a user to kick them!', 'red');
    if (reason.length < 1) reason = 'No reason specified';
    if (!kickUser.kickable) return client.util.embed(client, message, 'This person cannot be kicked by this bot. Please make sure my role in settings is higher than the highest role that the person you want to kick has.', 'red')

    kickUser.send({embed: {
            author: {name: `Hey ${kickUser.user.username}`, icon_url: kickUser.user.avatarURL},
            color: 0x36393F,
            description: `Looks like you\'ve been kicked from ${message.guild.name} by ${message.author.tag} for ${reason}. Naughty, naughty!`,
            footer: {text: `v${package.version}`}
        }}).then(() => {
        message.guild.members.find('id', kickUser.id).kick();
        client.util.embed(client, message, `Ok. I've kicked ${kickUser.user.username} for ${reason}.`);

        // Log kick to logging channel
        let dbchannel = client.data.guilds.get(message.guild.id).loggingChannel;
        let guildchannel = message.guild.channels.get(dbchannel);

        guildchannel.send({
            embed: {
                title: 'Kick',
                description: `**${message.author.tag} (${message.author.id})** has kicked **${kickUser.user.username} (${kickUser.id})** for **${reason}**.`,
                color: 0x36393F
            }
        });
    })
}

module.exports.info = {
    description: 'Kicks a specified user from the server.',
    usage: 'kick [@mention] (reason)'
}