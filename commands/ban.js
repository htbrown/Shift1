const package = require('../package.json');

module.exports = async (client, message, args) => {
    const banUser = message.mentions.members.first();
    var reason = args.slice(1).join(" ");

    if(!message.member.hasPermission("BAN_MEMBERS")) return client.util.embed(client, message, 'You do not have permission to use this command. If this is an error, make sure you have the \'Ban Members\' permission.', 'red');
    if (!banUser) return client.util.embed(client, message, 'You need to mention a user to ban them!', 'red');
    if (reason.length < 1) reason = 'No reason specified';
    if (!banUser.bannable) return client.util.embed(client, message, 'This person cannot be banned by this bot. Please make sure my role in settings is higher than the highest role that the person you want to ban has.', 'red')

    banUser.send({embed: {
            author: {name: `Hey ${banUser.user.username}`, icon_url: banUser.user.avatarURL},
            color: 0x36393F,
            description: `Oops! Looks like you\'ve been banned from ${message.guild.name} by ${message.author.tag} for ${reason}.`,
            footer: {text: `v${package.version}`}
        }}).then(() => {
        message.guild.ban(banUser.id);
        client.util.embed(client, message, `Ok. I've banned ${banUser.user.username} for ${reason}.`);
        // Log ban to logging channel
        let dbchannel = client.data.guilds.get(message.guild.id).loggingChannel;
        let guildchannel = message.guild.channels.get(dbchannel);

        guildchannel.send({
            embed: {
                title: 'Ban',
                description: `**${message.author.tag} (${message.author.id})** has banned **${banUser.user.username} (${banUser.id})** for **${reason}**.`,
                color: 0x36393F
            }
        });
    })
}

module.exports.info = {
    description: 'Bans a specified user from the server.',
    usage: 'ban [@mention] (reason)'
}