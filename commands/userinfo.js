module.exports = async (client, message, args) => {
	if (message.mentions.users.first()) {
		let user = message.mentions.users.first();
		message.channel.send({
			embed: {
				author: {
					name: `Hey ${message.author.username}`,
					icon_url: message.author.avatarURL
				},
				thumbnail: user.avatarURL,
				description: `Here's what I found on ${user.tag}.`,
				color: 0x36393F,
				fields: [
					{
						name: 'ID',
						value: user.id,
						inline: true
					},
					{
						name: 'Tag',
						value: user.tag,
						inline: true
					},
					{
						name: 'Highest Role',
						value: message.guild.member(user).highestRole.name,
						inline: true
					},
					{
						name: 'Created on',
						value: user.createdAt,
						inline: true
					},
					{
						name: 'Joined on',
						value: message.guild.member(user).joinedAt,
						inline: true
					},
					{
						name: 'Status',
						value: message.guild.member(user).presence.status,
						inline: true
					},
				]
			}
		})
	} else {
		let user = message.author;
		message.channel.send({
			embed: {
				author: {
					name: `Hey ${message.author.username}`,
					icon_url: message.author.avatarURL
				},
				thumbnail: user.avatarURL,
				description: `Here's what I found on ${user.tag}.`,
				color: 0x36393F,
				fields: [
					{
						name: 'ID',
						value: user.id,
						inline: true
					},
					{
						name: 'Tag',
						value: user.tag,
						inline: true
					},
					{
						name: 'Highest Role',
						value: message.member.highestRole.name,
						inline: true
					},
					{
						name: 'Created on',
						value: user.createdAt,
						inline: true
					},
					{
						name: 'Joined on',
						value: message.member.joinedAt,
						inline: true
					},
					{
						name: 'Status',
						value: message.member.presence.status,
						inline: true
					},
				]
			}
		})
	}
};

module.exports.info = {
	description: 'Finds information on a user or you.',
    usage: 'userinfo (user mention)'
};
