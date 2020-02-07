# Shift v1

You lot asked for it, so here it is.  
Don't bully me for my bad code.

Web is far from finished, so I wouldn't use it.  
Bot won't be updated or supported, so you can edit it if you want but make sure to follow the license.

## ./config.json

This file is needed for configuration.

```json
{
  "token": "",
  "prefix": ".",
  "maintainers": [""],
  "defaultGuildDB": {
    "prefix": ".",
    "strikes": {},
    "welcomeMessages": false,
    "welcomeChannel": "general",
    "welcomeMsg": "Howdy, {user}. Welcome to {server}!",
    "leaveMessages": false,
    "leaveChannel": "general",
    "leaveMsg": "Farewell, {user}.",
    "agree": false,
    "agreeRole": "Member",
    "loggingChannel": "",
    "logging": false
  },
  "web": {
    "port": 2020
  },
  "id": "",
  "secret": ""
}
```

Just fill in the blanks.

## How to run

I highly recommend not running this bot - it's not secure and [Shift²](https://htbr.me/shift) is a much better bot. However, if you do want to run the bot, follow the steps.  
1. Clone the git repo
2. Open the folder in something a terminal application
3. Run `npm i`
4. Fill out the config.json file
5. Run `node .`

You're done! Shift v1 is now running on your bot account. A data folder will be automagically made by leveldown, so no need to worry about database things.
