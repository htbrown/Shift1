module.exports = async (client, message, args) => {
    client.util.embed(client, message, `You want my invite? Sure! [Click here to invite me!](https://discordapp.com/api/oauth2/authorize?client_id=${client.user.id}&permissions=8&scope=bot) Use it wisely!`, undefined, undefined, undefined, undefined, undefined, {url: 'https://media.giphy.com/media/ui1hpJSyBDWlG/giphy.gif'})
}
module.exports.info = {
    description: 'Sends the invite link for this bot.',
    usage: 'invite'
}