module.exports = async (client, message, args) => {
    client.util.embed(client, message, 'Hey! I\'m Shift, a multi-function Discord bot fit for any Discord server. I was created by Hayden.#2616 with help from contributors (run the contributors command) with Discord.js and various other packages.')
}

module.exports.info = {
    description: 'Sends information about the bot.',
    usage: 'info'
}