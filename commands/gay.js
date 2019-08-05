module.exports = async (client, message, args) => {
    var gayPercent = `${Math.floor(Math.random() * 100)}%`;

    if (message.content.includes(client.user.id)) return client.util.embed(client, message, 'I\'m afraid you\'ll have to get your nose out from where it doesn\'t belong.');

    if (message.mentions.members.first()) {
        client.util.embed(client, message, `${message.mentions.members.first().user.username} is ${gayPercent} gay!`);
    } else {
        client.util.embed(client, message, `${message.author.username} is ${gayPercent} gay!`);
    };
}

module.exports.info = {
    description: 'Tells you how gay someone is.',
    usage: 'gay (@mention)'
}