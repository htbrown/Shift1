module.exports = async (client, message, args) => {
    client.util.embed(client, message, `Pong! That message took ${Math.floor(client.ping)}ms.`);
}
module.exports.info = {
    description: 'Pings the bot.',
    usage: 'ping'
}