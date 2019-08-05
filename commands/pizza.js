const package = require('../package.json');
module.exports = async (client, message, args) => {
    if (!args[0]) return client.util.embed(client, message, 'You\'ve got to mention someone!', 'red');
    client.util.embed(client, message, `Mmmm pizza! Have a pizza ${message.mentions.users.first()}!`, undefined, undefined, undefined, undefined, undefined, {url: 'https://media.giphy.com/media/4ayiIWaq2VULC/giphy.gif'})
}
module.exports.info = {
    description: 'Give someone a pizza. Make \'em smile!',
    usage: 'pizza (@mention)'
}