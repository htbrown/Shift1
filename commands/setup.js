const package = require('../package.json'), config = require('../config.json');
module.exports = async (client, message, args) => {
    if(!message.member.hasPermission("ADMINISTRATOR")) return client.util.embed(client, message, 'You do not have permission to use this command. If this is an error, make sure you have the \'Administrator\' permission.', 'red');
    function setup() {
    message.channel.send({
        embed: {
            author: {
                name: `Hey ${message.author.username}`,
                icon_url: message.author.avatarURL
            },
            description: 'Welcome to my setup! Here you can change how I work in your server. To get started, react with one of the following reactions.\n\n❗ - Prefix\n👋 - Welcome Channel & Message\n🔑 - Toggle Welcome & Leave Messages\n🚪 - Leave Channel and Messages\n🔒 - Agree Verification Role\n👤 - Agree Verification\n📝 - Logging Channel\n❌ - Close',
            color: 0x36393F,
            footer: {
                text: `v${package.version}`
            }
        }
    }).then(async ctx => {
        ctx.react('❗') // Prefix
        ctx.react('👋') // Welcome Messages
        ctx.react('🔑') // Toggle Welcome & Leave Messages
        ctx.react('🚪'); // Leave Messages
        ctx.react('🔒') // Agree Role
        ctx.react('👤') // Agree Toggle
        ctx.react('❌') // Close
        ctx.react('📝') // Logging Channel

        const filter = (reaction, user) => user.id === message.author.id;
        const collector = ctx.createReactionCollector(filter, {});
        collector.on('collect', async r => {
            if (r.emoji.name === '📝') {
                ctx.clearReactions();                
                ctx.edit({
                    embed: {
                        author: {
                            name: `Hey ${message.author.username}`,
                            icon_url: message.author.avatarURL
                        },
                        description: 'Ok. Please send the **ID** of the channel you want your logs to be sent. (e.x: 557223157465491955)',
                        color: 0x36393F,
                        footer: {
                            text: `v${package.version}`
                        } 
                    }
                })
                let collector2 = ctx.channel.createMessageCollector(newmsg => newmsg.author.id === message.author.id);
                collector2.on('collect', async msg => {
                    collector2.stop();
                    let guild = client.data.guilds.get(message.guild.id);
                    guild.loggingChannel = msg.content;
                    client.data.guilds.set(message.guild.id, guild);

                    ctx.edit({
                        embed: {
                            author: {
                                name: `Hey ${message.author.username}`,
                                icon_url: message.author.avatarURL
                            },
                            description: 'Ok. I have saved your config.',
                            color: 0x36393F,
                            footer: {
                                text: `v${package.version}`
                            } 
                        }
                    })

                    setTimeout(() => {
                        ctx.delete();
                        msg.delete();
                        setup();
                    }, 2000);
                })
            }
            if (r.emoji.name === '👤') {
                if (client.data.guilds.get(message.guild.id).agree === true) {
                    let guild = client.data.guilds.get(message.guild.id);
                    guild.agree = false;
                    client.data.guilds.set(message.guild.id, guild);

                    ctx.edit({
                        embed: {
                            author: {
                                name: `Hey ${message.author.username}`,
                                icon_url: message.author.avatarURL
                            },
                            description: 'Ok. I have disabled agree verification.',
                            color: 0x36393F,
                            footer: {
                                text: `v${package.version}`
                            } 
                        }
                    })

                    setTimeout(() => {
                        ctx.delete();
                        setup();
                    }, 2000);
                } else if (client.data.guilds.get(message.guild.id).agree === false) {
                    let guild = client.data.guilds.get(message.guild.id);
                    guild.agree = true;
                    client.data.guilds.set(message.guild.id, guild);

                    ctx.edit({
                        embed: {
                            author: {
                                name: `Hey ${message.author.username}`,
                                icon_url: message.author.avatarURL
                            },
                            description: 'Ok. I have enabled agree verification.',
                            color: 0x36393F,
                            footer: {
                                text: `v${package.version}`
                            } 
                        }
                    })

                    setTimeout(() => {
                        ctx.delete();
                        setup();
                    }, 2000);
                } else {
                    ctx.edit({
                        embed: {
                            author: {
                                name: `Hey ${message.author.username}`,
                                icon_url: message.author.avatarURL
                            },
                            description: 'This isn\'t good, your server\'s database is a bit broken. Please join the support server and ask for your database to be reset. The support server can be found in the info command.',
                            color: 0x36393F,
                            footer: {
                                text: `v${package.version}`
                            } 
                        }
                    })
                }

            }
            if (r.emoji.name === '🔒') {
                ctx.clearReactions();                
                ctx.edit({
                    embed: {
                        author: {
                            name: `Hey ${message.author.username}`,
                            icon_url: message.author.avatarURL
                        },
                        description: 'Ok. Please send the name of the role you want members to gain after typing `agree`. (for example: Member)',
                        color: 0x36393F,
                        footer: {
                            text: `v${package.version}`
                        } 
                    }
                })
                let collector2 = ctx.channel.createMessageCollector(newmsg => newmsg.author.id === message.author.id);
                collector2.on('collect', async msg => {
                    collector2.stop();
                    let guild = client.data.guilds.get(message.guild.id);
                    guild.agreeRole = msg.content;
                    client.data.guilds.set(message.guild.id, guild);

                    ctx.edit({
                        embed: {
                            author: {
                                name: `Hey ${message.author.username}`,
                                icon_url: message.author.avatarURL
                            },
                            description: 'Ok. I have saved your config.',
                            color: 0x36393F,
                            footer: {
                                text: `v${package.version}`
                            } 
                        }
                    })

                    setTimeout(() => {
                        ctx.delete();
                        msg.delete();
                        setup();
                    }, 2000);
                })
            }
            if (r.emoji.name === '❗') {
                ctx.clearReactions();
                ctx.edit({
                    embed: {
                        author: {
                            name: `Hey ${message.author.username}`,
                            icon_url: message.author.avatarURL
                        },
                        description: 'Ok. Please send your desired prefix to this channel. Don\'t worry, your message will automatically be collected.',
                        color: 0x36393F,
                        footer: {
                            text: `v${package.version}`
                        } 
                    }
                })
                let collector2 = ctx.channel.createMessageCollector(newmsg => newmsg.author.id === message.author.id);
                collector2.on('collect', async msg => {
                    collector2.stop();
                    let guild = client.data.guilds.get(message.guild.id);
                    guild.prefix = msg.content;
                    client.data.guilds.set(message.guild.id, guild);

                    ctx.edit({
                        embed: {
                            author: {
                                name: `Hey ${message.author.username}`,
                                icon_url: message.author.avatarURL
                            },
                            description: 'Ok. I have saved your config.',
                            color: 0x36393F,
                            footer: {
                                text: `v${package.version}`
                            } 
                        }
                    })

                    setTimeout(() => {
                        ctx.delete();
                        msg.delete();
                        setup();
                    }, 2000);
                })
            }
            if (r.emoji.name === '👋') {
                if (client.data.guilds.get(message.guild.id).welcomeMessages === true) {
                    function welceaveSetup() {
                    ctx.clearReactions();
                    ctx.edit({
                        embed: {
                            author: {
                                name: `Hey ${message.author.username}`,
                                icon_url: message.author.avatarURL
                            },
                            description: 'Ok. Please send your desired channel in plaintext. (for example: general)',
                            color: 0x36393F,
                            footer: {
                                text: `v${package.version}`
                            } 
                        }
                    })
                    let collector1 = ctx.channel.createMessageCollector(newmsg => newmsg.author.id === message.author.id);
                    collector1.on('collect', async msg => {
                        collector1.stop();
                        let guild = client.data.guilds.get(message.guild.id);
                        guild.welcomeChannel = msg.content;
                        client.data.guilds.set(message.guild.id, guild);

                        msg.delete();

                        collector.stop();
                        ctx.edit({
                            embed: {
                                author: {
                                    name: `Hey ${message.author.username}`,
                                    icon_url: message.author.avatarURL
                                },
                                description: 'Ok. Please send your desired welcome message. {user} is the new user\'s username and {server} is the server\'s name.',
                                color: 0x36393F,
                                footer: {
                                    text: `v${package.version}`
                                } 
                            }
                        }); // alright
                        let collector3 = ctx.channel.createMessageCollector(newmsg => newmsg.author.id === message.author.id);
                        collector3.on('collect', async cmsg => {
                            collector3.stop();
                            let guild = client.data.guilds.get(message.guild.id);
                            guild.welcomeMsg = cmsg.content;
                            client.data.guilds.set(message.guild.id, guild);
                            
                            ctx.edit({
                                embed: {
                                    author: {
                                        name: `Hey ${message.author.username}`,
                                        icon_url: message.author.avatarURL
                                    },
                                    description: 'Ok. I have saved your config.',
                                    color: 0x36393F,
                                    footer: {
                                        text: `v${package.version}`
                                    } 
                                }
                            })
        
                            setTimeout(() => {
                                ctx.delete();
                                setup();
                            }, 2000);
    
                        })
                    })
                    }
                    welceaveSetup();
                }
            }
            if (r.emoji.name === '🔑') {
                if (client.data.guilds.get(message.guild.id).welcomeMessages === true && client.data.guilds.get(message.guild.id).leaveMessages === true) {    // alright
                    let guild = client.data.guilds.get(message.guild.id);
                    guild.welcomeMessages = false;
                    guild.leaveMessages = false;
                    client.data.guilds.set(message.guild.id, guild);

                    ctx.edit({
                        embed: {
                            author: {
                                name: `Hey ${message.author.username}`,
                                icon_url: message.author.avatarURL
                            },
                            description: 'Ok. I have disabled welcome and leave messages.',
                            color: 0x36393F,
                            footer: {
                                text: `v${package.version}`
                            } 
                        }
                    })

                    setTimeout(() => {
                        ctx.delete();
                        setup();
                    }, 2000);
                } else if (client.data.guilds.get(message.guild.id).welcomeMessages === false && client.data.guilds.get(message.guild.id).leaveMessages === false) {
                    let guild = client.data.guilds.get(message.guild.id);
                    guild.welcomeMessages = true;
                    guild.leaveMessages = true;
                    client.data.guilds.set(message.guild.id, guild);

                    ctx.edit({
                        embed: {
                            author: {
                                name: `Hey ${message.author.username}`,
                                icon_url: message.author.avatarURL
                            },
                            description: 'Ok. I have enabled welcome and leave messages.',
                            color: 0x36393F,
                            footer: {
                                text: `v${package.version}`
                            } 
                        }
                    })

                    setTimeout(() => {
                        ctx.delete();
                        setup();
                    }, 2000);
                } else {
                    ctx.edit({
                        embed: {
                            author: {
                                name: `Hey ${message.author.username}`,
                                icon_url: message.author.avatarURL
                            },
                            description: 'This isn\'t good, your server\'s database is a bit broken. Please join the support server and ask for your database to be reset. The support server can be found in the info command.',
                            color: 0x36393F,
                            footer: {
                                text: `v${package.version}`
                            } 
                        }
                    })
                }
            }
            if (r.emoji.name === '🚪') {
                if (client.data.guilds.get(message.guild.id).leaveMessages === true) {
                    function welceaveSetup() {
                    ctx.clearReactions();
                    ctx.edit({
                        embed: {
                            author: {
                                name: `Hey ${message.author.username}`,
                                icon_url: message.author.avatarURL
                            },
                            description: 'Ok. Please send your desired channel in plaintext. (for example: general)',
                            color: 0x36393F,
                            footer: {
                                text: `v${package.version}`
                            } 
                        }
                    })
                    let collector1 = ctx.channel.createMessageCollector(newmsg => newmsg.author.id === message.author.id);
                    collector1.on('collect', async msg => {
                        collector1.stop();
                        let guild = client.data.guilds.get(message.guild.id);
                        guild.leaveChannel = msg.content;
                        client.data.guilds.set(message.guild.id, guild);

                        msg.delete();

                        collector.stop();
                        ctx.edit({
                            embed: {
                                author: {
                                    name: `Hey ${message.author.username}`,
                                    icon_url: message.author.avatarURL
                                },
                                description: 'Ok. Please send your desired leave message. {user} is the new user\'s username and {server} is the server\'s name.',
                                color: 0x36393F,
                                footer: {
                                    text: `v${package.version}`
                                } 
                            }
                        }); // alright
                        let collector3 = ctx.channel.createMessageCollector(newmsg => newmsg.author.id === message.author.id);
                        collector3.on('collect', async cmsg => {
                            collector3.stop();
                            let guild = client.data.guilds.get(message.guild.id);
                            guild.leaveMsg = cmsg.content;
                            client.data.guilds.set(message.guild.id, guild);
                            
                            ctx.edit({
                                embed: {
                                    author: {
                                        name: `Hey ${message.author.username}`,
                                        icon_url: message.author.avatarURL
                                    },
                                    description: 'Ok. I have saved your config.',
                                    color: 0x36393F,
                                    footer: {
                                        text: `v${package.version}`
                                    } 
                                }
                            })
        
                            setTimeout(() => {
                                ctx.delete();
                                setup();
                            }, 2000);
    
                        })
                    })
                    }
                    welceaveSetup();
                }
            }
            if (r.emoji.name === '❌') { // ctx.clearReactions(); i think lemme try
                ctx.clearReactions();
                ctx.edit({
                    embed: {
                        author: {
                            name: `Hey ${message.author.username}`,
                            icon_url: message.author.avatarURL
                        },
                        description: 'This setup command has been closed and the config has been saved. To continue setting up, please re-run the setup command.',
                        color: 0x36393F,
                        footer: {
                            text: `v${package.version}`
                        } 
                    }
                });
                collector.stop();
            }
        });
    })
    }
    setup();
};
module.exports.info = {
    description: 'Changes the configuration for your server.',
    usage: 'setup'
}