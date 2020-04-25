exports.run = async (FM, args, respond, lng, FN) => {
  if (FN.fortnite && FN.fortnite.party && FN.fortnite.party.me) {
    if (FN.fortnite.party.me.meta.schema.GameReadiness_s === 'SittingOut') {
      FN.fortnite.party.me.patch({ GameReadiness_s: 'NotReady' })
    };
    if (FN.fortnite.party.me.meta.schema.GameReadiness_s === 'NotReady') {
      FN.fortnite.party.me.patch({ GameReadiness_s: 'SittingOut' })
    };
  };
}

exports.ownerOnly = false
exports.groupOnly = true
