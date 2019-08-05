module.exports = async (client, message, args) => {
    if (!args[0] || !args[1]) return client.util.embed(client, message, 'You\'ve got to mention 2 people!', 'red');
    if (!args[0].includes('<@') || !args[1].includes('<@')) return client.util.embed(client, message, 'You\'ve got to mention 2 people!', 'red')
    client.util.embed(client, message, `${args[0]} x ${args[1]}! Awh *cute* ❤`)
}
module.exports.info = {
    description: 'Ships 2 people together. Cute!',
    usage: 'ship [@mention] [@mention]'
}