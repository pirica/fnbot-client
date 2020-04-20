const {
  i18next
} = require('../structures/i18next.js')

exports.run = async (FM, args, respond, lng, FN) => {
  if (!args[0]) {
    return await respond(FM.friend.id, i18next.t('args_missing', { ns: 'bot', lng }))
  };
  const user = args.join(' ')
  try {
    const Profile = await FN.client.getProfile(user)
    const isFriended = await FN.client.hasFriend(Profile.id)
    if (isFriended) {
      return await respond(FM.friend.id, i18next.t('addfriend.already_friended', { ns: 'bot' }))
    };
    await FN.client.inviteFriend(Profile.id)
    return await respond(FM.friend.id, i18next.t('addfriend.success', { ns: 'bot', lng, username: `[${Profile.displayName}]` }))
  } catch (err) {
    return await respond(FM.friend.id, i18next.t('addfriend.error', { ns: 'bot', lng }))
  };
}

exports.ownerOnly = true
exports.groupOnly = true
