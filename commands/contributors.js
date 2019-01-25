module.exports = async (client, message, args) => {
    client.util.embed(client, message, 'Check your DMs.');
    client.util.embed_dm(client, message, 'Here are all the people that helped with the bot: \n```• Hayden - Developed the majority of the bot.\n• Xilog - Helped with errors and rolling playing message.\n• Hydrogen - Helped with database issues and rewrote the strike system.```');
}

module.exports.info = {
    description: 'See who helped with this bot.',
    usage: 'contributors'
}