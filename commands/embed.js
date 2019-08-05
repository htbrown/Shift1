const package = require('../package.json');

module.exports = async (client, message, args) => {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return client.util.embed(client, message, 'You do not have permission to use this command. If this is an error, make sure you have the \'Manage Messages\' permission.', 'red');
    if (!args) return client.util.embed(client, message, 'You need to include a message to put in the embed!', 'red');
    message.delete();
    message.channel.send({embed: {
            author: {name: message.author.username, icon_url: message.author.avatarURL},
            color: 0x36393F,
            description: args.join(" "),
            footer: {text: `v${package.version}`}
    }});
};

module.exports.info = {
    description: 'Create an embed with your choice of message.',
    usage: 'embed [message]'
}