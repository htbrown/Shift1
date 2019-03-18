module.exports = async (client, message, args) => {
    if (client.data.guilds.get(message.guild.id).agree === true) {
        let member = message.guild.member(message.author.id);
        let role = client.data.guilds.get(message.guild.id).agreeRole;
        member.addRole(message.guild.roles.find('name', role));
        message.delete();
        client.util.embed_dm(client, message, `Ok. You've been given the role ${role} in the server ${message.guild.name}.`);
        
        // Log agree to logging channel
        let dbchannel = client.data.guilds.get(message.guild.id).loggingChannel;
        let guildchannel = message.guild.channels.get(dbchannel);

        guildchannel.send({
            embed: {
                title: 'Agree',
                description: `**${message.author.tag} (${message.author.id})** has agreed to the rules. I've given him the appropriate role.`,
                color: 0x36393F
            }
        });
    } else {
        client.util.embed(client, message, 'Agree isn\'t setup in this server.');
    }
}

module.exports.info = {
    description: 'Agrees you to the rules and lets you enter the server.',
    usage: 'agree'
}