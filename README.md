# FNBot

FNBot is a Fortnite bot that can show every skin and emote in the lobby. It is written in Node.js using the [epicgames-fortnite-client](https://epicgames-client.kysune.me/) library.

#### Discord
https://discord.gg/WWSTpbb
> Note that the server is new so probably there won't be that many people on it.


## Features
- Set the bots skin and emote to everything you'd like
- Up to 15 people can join the bots lobby
- Multiple languages supported
  > There are translations for cosmetics and for bot messages. Currently, there are bot message translations for german. If you'd like to contribute, feel free to DM me on Discord (Terax#0916). If you want to know more about the cosmetic translations, visit the [server repository](https://github.com/Terax235/fnbot-server).
- Use commands to set cosmetics (You can provide either the name or the ID of the cosmetic).
- Simple installation (no need to install Node.js nor dependencies)

## Installation
> IMPORTANT: The setup of the server requires you to enter a server url. By default, it is https://fnserver.terax235.com. Currently, the server is offline, so please use https://fnbot-server.glitch.me/ as an alternative instead.

> It's very simple to install the bot, you don't even need to install Node.js or anything.

1. Go to the [releases](https://github.com/Terax235/fnbot-client/releases/latest) page and download the latest release.
2. Extract the zip to a new folder.
3. Open the bot folder in a terminal.
4. Run the bot using the following command:
   - Windows users: `./FNBot.exe`
   - Linux and macos users: `./FNBot`
   > This will prompt the setup script. You'll now need to enter some information which is required for the bot to work. After that, just run the script again. Then the bot should be able to go online.
5. Done. Now you can join the bots lobby and set its cosmetics. For a list of available commands, see [Commands](#Commands)

## Commands
> This commands will only work in direct messages, not in party chat.

#### Items
- `emote <name/ID>` - Sets the bots emote. `value` can be either the ID or the name of the emote you'd like to display
- `skin <name/ID>` - Sets the bots skin. `value` can be either the ID or the name of the skin you'd like to display

#### Moderation
- `addfriend <name/ID>` - Lets the bot send a friend request to somebody. Bot owner only.
- `invite <name/ID>` - Invites a friend of the bot to the party. Bot owner only.
- `kick <name/ID>` - Kicks a user. Bot owner only.
- `removefriend <name/ID>` - Lets the bot remove one of their friends. Bot owner only.


## Dependencies
#### npm
- [authenticator](https://www.npmjs.com/package/)
- [epicgames-client](https://www.npmjs.com/package/epicgames-client)
- [epicgames-fortnite-client](https://www.npmjs.com/package/epicgames-fortnite-client)
- [i18next](https://www.npmjs.com/package/i18next)
- [i18next-node-fs-backend](https://www.npmjs.com/package/i18next-node-fs-backend)
- [inquirer](https://www.npmjs.com/package/inquirer)
- [node-fetch](https://www.npmjs.com/package/node-fetch)
- [pkg](https://www.npmjs.com/package/pkg) (used to compile application into a single file)