const Fortnite = require('./structures/Fortnite.js')
const Server = require('./structures/Server.js')
const I18N = require('./structures/i18next.js')
const path = require('path')
const fs = require('fs')
const pkgfile = require('./package.json')
const config = require(process.cwd() + '/config.json', 'must-exclude')

const I18NPromise = new I18N()

const commands = {}

// Load commands
fs.readdir(path.join(__dirname, './commands/'), (err, files) => {
  if (err) { throw err };
  files.forEach(file => {
    const f = require(path.join(__dirname, `./commands/${file}`))
    if (!f.run) return
    commands[file.split('.')[file.split('.').length - 2]] = f
  })
})

I18NPromise.then(async i18next => {
  const server = new Server({
    url: config.server_url,
    version: pkgfile.serverVersion
  })
  if (server instanceof Object && server.error) {
    if (server.msg === 'baseurl_missing') {
      console.log(i18next.t('Server.baseurl_missing', {
        ns: 'errors',
        lng: config.preferred_language
      }))
      process.exit(1)
    };
  };
  server.checkStatus().then(async status => {
    const Build = await server.checkBuild()
    if (!Build.server_off && JSON.stringify(Build) !== JSON.stringify(config.build)) {
      config.build = Build
      console.log(`[${i18next.t('information', { ns: 'console', lng: config.preferred_language })}] ${i18next.t('build_updated', { ns: 'console', lng: config.preferred_language })}`)
      require('fs').writeFileSync('./config.json', JSON.beautify(config))
    };
    const clientPromise = new Fortnite(config, i18next)
    clientPromise.then(async (FN) => {
      if (typeof FN === 'string') {
        if (FN === 'init_failed') {
          console.log(i18next.t('Fortnite.init_failed', {
            ns: 'errors',
            lng: config.preferred_language
          }))
          process.exit(1)
        };
        if (FN === 'login_failed') {
          console.log(i18next.t('Fortnite.login_failed', {
            ns: 'errors',
            lng: config.preferred_language
          }))
          process.exit(1)
        };
      } else {
        if (config.bot.acceptallfriends) {
          FN.client.communicator.on('friend:request', (FR) => {
            return FR.accept()
          })
          FN.fortnite.communicator.on('friend:request', (FR) => {
            return FR.accept()
          })
        };
        let setLoadout = false
        FN.fortnite.communicator.on('party:invitation', async PI => {
          PI.accept()
        })
        FN.fortnite.communicator.on('party:member:joined', async PMD => {
          if (!setLoadout) {
            FN.fortnite.party.me.setOutfit('/Game/Athena/Items/Cosmetics/Characters/CID_434_Athena_Commando_F_StealthHonor.CID_434_Athena_Commando_F_StealthHonor')
            setLoadout = true
          };
          if (PMD.id !== FN.client.account.id) {
            setTimeout(() => {
              FN.fortnite.party.me.setEmote('/Game/Athena/Items/Cosmetics/Dances/EID_Wave.EID_Wave')
              setTimeout(() => {
                FN.fortnite.party.me.clearEmote()
              }, 3000)
            }, 1000)
          };
        })
        // eslint-disable-next-line no-inner-declarations
        async function respond (user, msg) {
          await FN.fortnite.communicator.sendMessage(user, msg)
        };
        FN.client.communicator.on('friend:message', async (FM) => {
          if (!FN.fortnite.party || !FN.fortnite.party.me) return
          const command = FM.message.split(' ')[0]
          const args = FM.message.split(' ').slice(1)
          if (commands[command.toLowerCase()]) {
            const cmd = commands[command.toLowerCase()]
            if (cmd.groupOnly && !FN.fortnite.party.members.filter(m => m.id === FM.friend.id)[0]) {
              return await FN.fortnite.communicator.sendMessage(FM.friend.id, i18next.t('msg_notingroup', {
                ns: 'bot',
                lng: config.preferred_language
              }))
            }
            if (cmd.ownerOnly && FM.friend.id !== FN.client.owner.id) {
              return await FN.fortnite.communicator.sendMessage(FM.friend.id, i18next.t('msg_owneronly', {
                ns: 'bot',
                lng: config.preferred_language
              }))
            };

            return await cmd.run(FM, args, respond, config.preferred_language, FN)
          };
        })
        setInterval(async () => {
          await server.checkStatus()
          const build = await server.checkBuild()
          if (!build.server_off && JSON.stringify(build) !== JSON.stringify(config.build)) {
            config.build = build
            console.log(`[${i18next.t('information', { ns: 'console', lng: config.preferred_language })}] ${i18next.t('build_updated_restart', { ns: 'console', lng: config.preferred_language })}`)
            require('fs').writeFileSync(process.cwd() + '/config.json', JSON.beautify(config))
          };
        }, 1000 * 60)
      };
    })
  })
})
