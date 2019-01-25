module.exports = async (client, message, args) => {
    /*
        rmstrike, by Hydrogen.
    */
    if (message.member.hasPermission('KICK_MEMBERS')) {   // lol
        let member = message.mentions.users.first();
        let strikeID = args.slice(1).join(" ");
        if (member) {
            let id = args.slice(1).join(' ');
            if (id) {
                if (client.data.guilds.get(message.guild.id).strikes[member.id][strikeID]) {
                    let strike = client.data.guilds.get(message.guild.id).strikes[member.id][strikeID]
                    delete guilds.get(msg.guild.id).strikes[member.id][strikeID]
                    client.util.embed(client, message, `The strike \`${strikeID}\` has been removed.`, 'green');
                }
            } else {
                client.util.embed(client, message, 'You need to add a strike ID to remove it!', 'red');
            }
        } else {
            client.util.embed(client, message, 'You need to mention a user to remove a strike!', 'red');
        }
    } else {
        client.util.embed(client, message, 'You do not have permission to use this command. If this is an error, make sure you have the \'Kick Members\' permission.', 'red');
    }
}

module.exports.info = {
    description: 'Removes a strike from a user.',
    usage: 'rmstrike [@user] [id]'
};