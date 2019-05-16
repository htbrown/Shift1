const config = require('../config.json');
module.exports = async (client, message, args) => {
    code = args.join(" ");
    if (!config.maintainers.includes(message.author.id)) return client.util.embed(client, message, '*Oi!* You\'re not supposed to be here! Get lost!', 'red');
    if (!code) return client.util.embed(client, message, 'You need to give me something to evaluate!', 'red');
    try {
        var evaled = eval(args.join(" "));

        if (evaled === client.token || evaled === config.token || evaled.includes(client.token)) return client.util.embed(client, message, 'Now you really shouldn\'t be here! Go on, off you go.', 'red');

        if (typeof evaled !== "string"){
            evaled = require("util").inspect(evaled);
        }

        client.util.embed(client, message, `\`\`\`${evaled}\`\`\``);
    } catch (err) {
        client.util.embed(client, message, `Seems like something's gone wrong with your code. Here's what I returned. \n\`\`\`${err}\`\`\``, 'red');
    }
}

module.exports.info = {
    description: 'Runs JS. Maintainer only.',
    usage: 'ev [code]'
}