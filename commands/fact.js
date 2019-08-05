const rfact = require('random-facts');
module.exports = async (client, message, args) => {
    client.util.embed(client, message, `Your random fact is: ${rfact.randomFact()}`);
}
module.exports.info = {
    description: 'Gives you a random fact.',
    usage: 'fact'
}