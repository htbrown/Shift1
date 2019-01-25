const package = require('../package.json');
module.exports = async (client, message, args) => {
    if (!args[0]) return client.util.embed(client, message, 'You\'ve got to mention someone!', 'red');
    client.util.embed(client, message, `Sure! Here's their avatar.`, undefined, undefined, undefined, undefined, undefined, {url: message.mentions.users.first().displayAvatarURL})
}
module.exports.info = {
    description: 'Grab someone\'s avatar.',
    usage: 'avatar [@mention]'
}