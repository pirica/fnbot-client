const Server = require("../structures/Server.js");
const {
    i18next
} = require("../structures/i18next.js");

exports.run = async (FM, args, respond, lng, FN) => {
    if (!args[0]) return await respond(FM.friend.id, i18next.t("args_missing", {
        ns: "bot",
        lng
    }));
    var query = args.join(" ");
    var displayName = query;
    const Request = await Server.searchCosmetic(query, "emote");
    if (Request.id) query = Request.id;
    if (Request.name) {
        if (Request.name[lng]) {
            displayName = Request.name[lng];
        } else {
            displayName = Request.name.en;
        };
    }
    await FN.fortnite.party.me.setEmote("/Game/Athena/Items/Cosmetics/Dances/" + query + "." + query);
    FN.fortnite.currentLoadout.emote = query;
    return await respond(FM.friend.id, i18next.t("msg_emotechanged", {
        ns: "bot",
        lng,
        emote: displayName
    }));
};

exports.ownerOnly = false;
exports.groupOnly = true;