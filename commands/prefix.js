module.exports = async (client, message, args) => {
    /*
        prefix, by Hydrogen.
    */
    if (message.member.hasPermission('KICK_MEMBERS')) { 
        let prefix = args.join(" ");
        if (prefix) {
            let guild = client.data.guilds.get(message.guild.id);
            guild.prefix = prefix;
            client.data.guilds.set(message.guild.id, guild);
            client.util.embed(client, message, `Sure! The prefix for this server has been changed to \`${prefix}\`.`);
        } else {
            client.util.embed(client, message, 'You need to add a prefix to change to it.', 'red');
        }
    } else {
        client.util.embed(client, message, 'You do not have permission to use this command. If this is an error, make sure you have the \'Kick Members\' permission.', 'red');
    }
}

module.exports.info = {
    description: 'Changes your server\'s prefix.',
    usage: 'prefix [prefix]'
};