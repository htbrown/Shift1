const c = require('crypto-random-string');
const package = require('../package.json');
module.exports = async (client, message, args) => {
    var strikeUser = message.mentions.members.first();
    var reason = args.slice(1).join(" ");

    if(!message.member.hasPermission("KICK_MEMBERS")) return client.util.embed(client, message, 'You do not have permission to use this command. If this is an error, make sure you have the \'Kick Members\' permission.', 'red');
    if (!strikeUser) return client.util.embed(client, message, 'You need to mention a user to strike them!', 'red');
    if (reason < 1) reason = 'No reason specified';

    let info = client.data.guilds.get(message.guild.id);
    let uid = c(12);

    if (isEmpty(info.strikes)) { 
        info.strikes[strikeUser.id] = {};
        info.strikes[strikeUser.id][uid] = {
            reason: reason,
            strikedBy: message.author.toString(),
            id: uid
        };
        client.data.guilds.set(message.guild.id, info);
    } else if (info.strikes[strikeUser.id]) {
        while (info.strikes[strikeUser.id][uid]) { uid = randomstring(12) }
        info.strikes[strikeUser.id][uid] = {
            reason: reason,
            strikedBy: message.author.toString(),
            id: uid
        };
    } else {
        info.strikes[strikeUser.id] = {};
        info.strikes[strikeUser.id][uid] = {
            reason: reason,
            strikedBy: message.author.toString(),
            id: uid
        };
        client.data.guilds.set(message.guild.id, info);
    }

    client.data.guilds.set(message.guild.id, info);
    client.util.embed(client, message, `Ok. I have striken ${strikeUser} for \`${reason}\``);
    strikeUser.send({ embed: {
        author: { name: `Hey ${strikeUser.user.username}`, icon_url: strikeUser.user.avatarURL} ,
        color: 0x36393F,
        description: `Oi! You've just been stricken in ${message.guild.name} by ${message.author.tag} for ${reason}. What have you done now?`,
        footer: { text: `v${package.version}` }
    }});
}

module.exports.info = {
    description: 'Strike someone in the Discord server.',
    usage: 'strike [@mention] (reason)'
}

const isEmpty = (obj) => { // rebooted
    if (obj == null) return true;
    if (obj.length > 0)    return false;
    if (obj.length === 0)  return true;
    if (typeof obj !== "object") return true;
    for (var key in obj) {
        if (hasOwnProperty.call(obj, key)) return false;
    }

    return true;
}