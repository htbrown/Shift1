const config = require('../config.json');

module.exports = (client, message, args) => {
    let msg = args.slice(0).join(" ");
    if (!config.maintainers.includes(message.author.id)) return;

    client.guilds.forEach(g => {
        client.users.get(g.ownerID).send({
            embed: {
                title: `A message from ${message.author.username}:`,
                description: msg,
                color: 0x36393F,
                footer: {
                    text: 'If you recieved this DM more than once, it means you own more than one server with Shift in it.'
                }
            }
        })
    })
};
module.exports.info = {
    description: 'DMs the owner of every server Shift is in. Maintainer only.',
    usage: 'ownermsg [message]'
};
