const EGClient = require('epicgames-client')
const FNClient = require('epicgames-fortnite-client')
const Adapter = require('epicgames-client-login-adapter')
const Authenticator = require('./Authenticator.js')

var client, fortnite, br

class Fortnite {
  constructor (options, i18next) {
    if (options.build && options.build.launcher) {
      client = new EGClient.Launcher({
        build: options.build.launcher.build,
        engineVersion: options.build.launcher.engineVersion,
        netCL: options.build.launcher.netCL
      })
    } else {
      client = new EGClient.Launcher()
    };
    return new Promise(function (resolve, reject) {
      console.log('[1] ' + i18next.t('initiating', {
        ns: 'console',
        lng: options.preferred_language
      }))
      client.init().then(async (success) => {
        if (!success) return resolve('init_failed')
        var login = null
        console.log('[2] ' + i18next.t('logging_in.no_2fa', { ns: 'console', lng: options.preferred_language }))
        try {
          const clientLoginAdapter = await Adapter.init({ login: options.bot.login.email, password: options.bot.login.password })
          const exchangeCode = await clientLoginAdapter.getExchangeCode()
          await clientLoginAdapter.close()
          login = await client.login(null, exchangeCode)
        } catch (error) {
          if (error.toString().includes('cannot open shared object file')) {
            console.log('[i] ' + i18next.t('logging_in.nogui', { ns: 'console', lng: options.preferred_language }))
            if (options.bot.login.token_2fa) {
              login = await client.login({ email: options.bot.login.email, password: options.bot.login.password, twoFactorCode: await Authenticator.GetAuthToken(options.bot.login.token_2fa) })
            } else {
              login = await client.login({ email: options.bot.login.email, password: options.bot.login.password })
            };
          };
        };
        if (options.bot.acceptallfriends) {
          const PendingFriends = await client.getFriendRequests()
          PendingFriends.filter(f => f.direction === 'INBOUND').forEach(friend => friend.accept())
        };
        if (!login) return resolve('login_failed')
        console.log('    ' + i18next.t('logging_in.logged_in', {
          ns: 'console',
          lng: options.preferred_language,
          username: client.account.name,
          account_id: client.account.id
        }))
        console.log('[3] ' + i18next.t('starting_fn', {
          ns: 'console',
          lng: options.preferred_language
        }))
        fortnite = await client.runGame(FNClient, {
          netCL: options.build.fortnite.netCL,
          partyBuildId: options.build.fortnite.buildID,
          http: {
            headers: {
              'User-Agent': options.build.fortnite.UserAgent
            }
          },
          defaultPartyConfig: {
            privacy: EGClient.EPartyPrivacy[options.bot.party_privacy.toUpperCase()],
            joinConfirmation: false,
            joinability: 'OPEN',
            maxSize: 16,
            subType: 'default',
            type: 'default',
            inviteTTL: 14400,
            chatEnabled: true
          }
        })
        console.log('[4] ' + i18next.t('prepare_br', {
          ns: 'console',
          lng: options.preferred_language
        }))
        br = await fortnite.runSubGame(FNClient.ESubGame.BattleRoyale)
        console.log(`[${i18next.t('ready', { ns: 'console', lng: options.preferred_language })}] ${i18next.t('bot_in_lobby', { ns: 'console', lng: options.preferred_language })}`)
        const Owner = await client.getProfile(options.bot.owner)
        client.owner = Owner
        fortnite.currentLoadout = {
          skin: null,
          backpack: null,
          pickaxe: null,
          emote: null
        }
        return resolve({
          client,
          fortnite,
          br
        })
      })
    })
  };
};

module.exports = Fortnite
