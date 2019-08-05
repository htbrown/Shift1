module.exports = async (client, message, args) => {
    var alivePercent = `${Math.floor(Math.random() * 100)}%`;

    if (message.content.includes(client.user.id)) return client.util.embed(client, message, `I'm a robot, I live in the clouds.`);

    if (message.mentions.members.first()) {
        client.util.embed(client, message, `${message.mentions.members.first().user.username} is ${alivePercent} alive!`);
    } else {
        client.util.embed(client, message, `${message.author.username} is ${alivePercent} alive!`);
    };
}

module.exports.info = {
    description: 'Tells you how alive someone is.',
    usage: 'alive (@mention)'
}