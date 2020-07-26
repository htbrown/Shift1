# Shift v1

>>> **Deprecation Notice** - this code is old and will not be maintained. Any pull requests or issues will not be seen. I would not recommend running this bot. 
>>> Instead, I would recommend using **[Shift²](https://htbr.me/shift)**

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
