const Server = require('../structures/Server.js')
const { i18next } = require('../structures/i18next.js')

exports.run = async (FM, args, respond, lng, FN) => {
  if (!args[0]) {
    return await respond(FM.friend.id, i18next.t('args_missing', { ns: 'bot', lng }))
  };
  let query = args.join(' ')
  let displayName = query
  let setBackpack = false
  const Request = await Server.searchCosmetic(query, 'skin')
  if (Request.data) {
    if (Request.data.id) { query = Request.data.id };
    if (Request.data.name) {
      if (Request.data.name[lng]) {
        displayName = Request.data.name[lng]
      } else {
        displayName = Request.data.name.en
      };
    };
    if (Request.data.matches && Request.data.matches.length > 0) {
      if (Request.data.matches.filter(p => p.type === 'backpack').length === 1) {
        setBackpack = Request.data.matches.filter(p => p.type === 'backpack')[0].id
      };
    };
  };

  await FN.fortnite.party.me.setOutfit('/Game/Athena/Items/Cosmetics/Characters/' + query + '.' + query)
  FN.fortnite.currentLoadout.skin = query
  if (setBackpack && !FN.fortnite.currentLoadout.backpack) {
    await FN.fortnite.party.me.setBackpack('/Game/Athena/Items/Cosmetics/Backpacks/' + setBackpack + '.' + setBackpack)
  };
  if (FN.fortnite.currentLoadout.emote) {
    await FN.fortnite.party.me.clearEmote()
    await FN.fortnite.party.me.setEmote('/Game/Athena/Items/Cosmetics/Dances/' + FN.fortnite.currentLoadout.emote + '.' + FN.fortnite.currentLoadout.emote)
  };
  return await respond(FM.friend.id, i18next.t('msg_skinchanged', { ns: 'bot', lng, skin: displayName }))
}

exports.ownerOnly = false
exports.groupOnly = true
