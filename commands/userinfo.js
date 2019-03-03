module.exports = async (client, message, args) => {
	let user;
	switch (user) {
		case message.mentions.users.first():
			user = message.mentions.users.first();
			break;
		case !message.mentions.users.first():
			user = message.author;
			break;
		default:
			user = message.author;
			break;
	}
	
	message.channel.send({
		embed: {
			title: `${user.username}'s Information`,
			description: 'Here\'s what I found on ${user.tag}.',
			fields: [
				{
					name: 'ID',
					value: user.id,
					inline: true
				}
			]
		}
	})
};

module.exports.info = {
	description: 'Finds information on a user or you.',
    usage: 'userinfo (user mention)'
};
