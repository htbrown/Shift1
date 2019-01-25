const discord = require('discord.js');
module.exports = async (client, message, args) => {
    guilds = client.data.guilds;

    let member = message.author;
    if (message.mentions.users.size > 0) member = message.mentions.users.first();

    gStrikes = guilds.get(message.guild.id).strikes;

    strikes = gStrikes[member.id];
    if (isEmpty(strikes)) return client.util.embed(client, message, `Well would you look at that! ${member.username} doesn't have any strikes!`);

    const e = new discord.RichEmbed();
    e.setTitle(`${member.username}'s Strikes`)
    e.setDescription(`**${Object.keys(strikes).length}** strikes found.`)
    // Changes color by how many strikes
    if (Object.keys(strikes).length < 6) e.setColor(0xf44171)
    else if (Object.keys(strikes).length > 5) e.setColor(0xf1f442)
    else if (Object.keys(strikes).length > 13) e.setColor(0xff3737)

    Object.keys(strikes).forEach(strike => {
        e.addField(strikes[strike]['reason'], `${strike} | by ${strikes[strike]['strikedBy']}`)
    });

    message.channel.send(e);
}

module.exports.info = {
    description: 'View a user\'s or your strikes.',
    usage: 'strikes [@user]'
}

const isEmpty = (obj) => {
    if (obj == null) return true;
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    if (typeof obj !== "object") return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}