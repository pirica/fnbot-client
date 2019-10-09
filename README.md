# FNBot

FNBot is a simple to run Fortnite bot that can show all cosmetics you like. It is written in [Node.js](https://nodejs.org/en).

## Discord

Need some help, want to contribute or just want to chat? Feel free to join my [Discord server](https://discord.gg/WWSTpbb)!

## Features

- Set the bots cosmetics to everything you want by simply providing the cosmetics name or ID.
- Up to 15 people can join the bots lobby.
- Multiple languages supported:
  - You can provide cosmetic names in many different languages (all that Fortnite has at the moment).
  - Bot messages, console texts etc. can be shown in English, French, German and Italian. [More information here](#Translators)
- Very simple installation (no need to install Node.js, you can just use the binaries).

## Installation

[Installation Guide](https://github.com/Terax235/fnbot-client/wiki/Installation)

## Commands

[Command List](https://github.com/Terax235/fnbot-client/wiki/Commands)

## Translators

- French: [@xXPsychoPastXx](https://twitter.com/xXPsychoPastXx)
- Italian: [@Chicchi7393](https://twitter.com/Chicchi7393)

> If you want to add translations, feel free to [join my Discord](https://discord.gg/WWSTpbb) and contact me (`Terax#0916`).

## Planned Features

- Support for changing the pickaxe.
- Support for other clients than Fortnite
  - **Discord:** Will allow users to use [commands](https://github.com/Terax235/fnbot-client/wiki/Commands) on Discord using a Discord bot.
- Bot shutdown / restart
  - As a command (`shutdown` and `restart`)
  - Automatically in case that the Fortnite servers are offline.
- Warnings
  - Automatically receive warnings from the cosmetic servers.
  - Warnings can be used to announce maintenance, to inform about commands / features not working, and more.
- Support for inviting the bot in own parties

## Dependencies

### npm

- [authenticator](https://www.npmjs.com/package/)
- [epicgames-client](https://www.npmjs.com/package/epicgames-client)
- [epicgames-fortnite-client](https://www.npmjs.com/package/epicgames-fortnite-client)
- [i18next](https://www.npmjs.com/package/i18next)
- [i18next-node-fs-backend](https://www.npmjs.com/package/i18next-node-fs-backend)
- [inquirer](https://www.npmjs.com/package/inquirer)
- [node-fetch](https://www.npmjs.com/package/node-fetch)
- [pkg](https://www.npmjs.com/package/pkg) (used to create binaries)
