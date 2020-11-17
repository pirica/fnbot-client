# FNBot

FNBot is a simple to run Fortnite bot that can show all cosmetics you like. It is written in [Node.js](https://nodejs.org/en).

NOTE: I'm not actively maintaining the bot since I don't have time for that, so don't expect me to respond fast or to fix issues that could occur.

## Support me
If you want to support me, feel free to by using my Support-a-Creator code `terax235` in Fortnite :).
Every purchase counts and allows me to keep my projects up.

## Discord

You can contact me at Discord, just send a friend request to `Terax#0235`.

## Features

- Set the bots cosmetics to everything you want by simply providing the cosmetics name or ID.
- Up to 15 people can join the bots lobby.
- Multiple languages supported:
  - You can provide cosmetic names in many different languages (all that Fortnite has at the moment).
  - Bot messages, console texts, etc. can be shown in Arabic, English, French, German, Italian, and Romanian. [More information here](#Translators)
- Very simple installation (no need to install Node.js, you can just use the binaries).

## Login
The first login requires you to use a browser. Follow [this link](https://www.epicgames.com/id/logout?redirectUrl=https%3A//www.epicgames.com/id/login%3FredirectUrl%3Dhttps%253A%252F%252Fwww.epicgames.com%252Fid%252Fapi%252Fredirect%253FclientId%253Dec684b8c687f479fadea3cb2ad83f5c6%2526responseType%253Dcode), login with your bot account, copy the value of `redirectUrl` and paste it to the console. After that, device auth will be used to login.

## Installation

[Installation Guide](https://github.com/Terax235/fnbot-client/wiki/Installation)

## Commands

[Command List](https://github.com/Terax235/fnbot-client/wiki/Commands)

## Translators

- Arabic: `Saeed#1697`
- French: [@xXPsychoPastXx](https://twitter.com/xXPsychoPastXx)
- Italian: [@Chicchi7393](https://twitter.com/Chicchi7393)
- Romanian: `Skadro#1659`

> If you want to add translations, feel free to [join my Discord](https://discord.gg/dksmQK7) and contact me (`Terax#0916`).

## Planned Features

- Support for changing the pickaxe.
- Support for item variants (styles for skins, backpacks, etc.)
- Support for other clients than Fortnite
  - **Discord:** Will allow users to use [commands](https://github.com/Terax235/fnbot-client/wiki/Commands) on Discord using a Discord bot.
- Bot shutdown / restart
  - As a command (`shutdown` and `restart`)
  - Automatically in case that the Fortnite servers are offline.
- Warnings
  - Automatically receive warnings from the cosmetic servers.
  - Warnings can be used to announce maintenance, to inform about commands/features not working, and more.
- Better support for inviting the bot in own parties
