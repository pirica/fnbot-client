# fnbot-client - Changelogs

## Version 1.1.3
- Added french translation. Thanks to [xXPsychoPastXx](https://twitter.com/xXPsychoPastXx).

## Version 1.1.2
- After running the setup, the bot will now directly start the bot. *This doesn't work with the binaries, only with the source code.*
- Added italian translation. Thanks to `Chicchi7393#0081` ([@Chicchi7393](https://twitter.com/Chicchi7393)).
- i18next will now properly load all locales automatically.

## Version 1.1-hotfix (1.1.1)
This version includes a little fix for the server url https://fnserver.terax235.com/, changing it to https://fnserver.herokuapp.com/ if it is offline.

## Version 1.1

### General
#### Simplified Setup
1. The whole setup process has been reworked. Instead of having to edit a `config.json.example` file, you'll just get the questions asked if you start the bot the first time. You can also reconfigure the bots settings using the argument `-r`.
2. The script now automatically detects whether the config has an invalid format. If that's the case, you'll be prompted to do the setup again.
3. Build information updates will now get checked even while the bot is online, and you'll be warned once there is new build information available.
4. Build information will now be refreshed __before__ the bot starts, which means that you'll not have to restart if the build information has been updated, except it is updated while the bot is already online.
> Everyone who is updating from 1.0 will have to complete the setup, but the old values will be saved (which means that you don't have to type in everything manually).

#### Better error handling
1. Once the script detects that the cosmetic server are offline, you won't longer receive request errors. It'll simply ignore requests until the cosmetic server is back online.
2. Some bugs were fixed in general, meaning that less errors should occur.

#### Code rework
> The source code has been completly reworked. It is now a bit better to read (It's still complicated) and things like Fortnite login process have own files now.

### Commands
> With 1.0, there were only two commands: `skin` and `emote`. But now, there are some new commands to manage the bot.

#### New commands
- Added command `backpack <backpack>` => Set the bots backpack using this command.
- Added command `addfriend <name/ID>` => Let the bot add a user as friend using this command.
- Added command `removefriend <name/ID>` => Let the bot remove a user from their friend list.
- Added command `invite <name/ID>` => Invites a user to the bots party. *Useful if you've set the bots parties privacy to private.*
- Added command `kick <name/ID>` => Kicks a user out of the party.

#### Updated commands
- Command `skin`: If a skin has an own backpack in it's cosmetic set and you didn't set a backpack manually, the bot will change it's backpack to the one of the skins set.

### Translations

#### Improvements
- If the bots login failed, an error message in the correct language will now be displayed.

## Version 1.0
> First release