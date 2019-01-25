const package = require('../package.json');
module.exports = async (client, message, description, color, title, fields, footer, thumbnail, image) => {
    switch(color) {
        case 'red':
        color = 0xe74c3c;
        break;
        case 'blue':
        color = 0x3498db;
        break;
        case 'green':
        color = 0x2ecc71;
        break;
        default:
        color = 0x36393F;
        break;
        case 'yellow':
        color = 0xffff00;
        break;
    }
    
    return message.author.send({embed: {
        author: {name: `Hey ${message.author.username}`, icon_url: message.author.avatarURL},
        color,
        title,
        description,
        fields,
        thumbnail,
        image,
        footer: {text: footer !== undefined ? footer + ` | v${package.version}` : `v${package.version}`}
    }});
}