const package = require('../package.json');

module.exports = async (client, message, args) => {
    if (!args[0]) return client.util.embed(client, message, `You, my friend, need some friends.`, undefined, undefined, undefined, undefined, undefined, {url: 'https://media1.tenor.com/images/0b76d2714be31c6b0b88eb3be1a6c4f9/tenor.gif?itemid=4367540'})
    if (args[0].id == message.author.id) return client.util.embed(client, message, `Lonely meter: 999`);
    client.util.embed(client, message, `*Awhh!* <@${message.author.id}> just hugged ${args[0]}!`, undefined, undefined, undefined, undefined, undefined, {url: 'https://media.giphy.com/media/lXiRKBj0SAA0EWvbG/giphy.gif'})
}
module.exports.info = {
    description: 'Hug someone!',
    usage: 'hug (@mention)'
}