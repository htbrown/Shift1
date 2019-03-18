module.exports = async (client, message, args) => {
    var purgeAmount = parseInt(args[0], 10);
    if (!purgeAmount) return client.util.embed(client, message, 'You need to add how many messages you want to delete!', 'red');
    if (purgeAmount < 2 || purgeAmount > 100) return client.util.embed(client, message, 'You need to give an amount between 2 and 100.');
    if (!message.member.hasPermission('MANAGE_MESSAGES')) return client.util.embed(client, message, 'You do not have permission to use this command. If this is an error, make sure you have the \'Manage Messages\' permission.', 'red');
    message.delete();
    const fetched = await message.channel.fetchMessages({limit: purgeAmount});
    message.channel.bulkDelete(fetched).catch(error => console.log(`Couldn't delete messages because of: ${error}`));
    client.util.embed(client, message, `Ok. I have deleted ${purgeAmount} messages.`)

    // Log purge to logging channel
    if (client.data.guilds.get(message.guild.id).logging === true) {
        let dbchannel = client.data.guilds.get(message.guild.id).loggingChannel;
        let guildchannel = message.guild.channels.get(dbchannel);

        guildchannel.send({
            embed: {
                title: 'Purge',
                description: `**${message.author.tag} (${message.author.id})** has purged **${purgeAmount}** messages in **${message.channel.name}**.`,
                color: 0x36393F
            }
        });
    }
}

module.exports.info = {
    description: 'Removes a specified amount of messages.',
    usage: 'purge [amount]'
}