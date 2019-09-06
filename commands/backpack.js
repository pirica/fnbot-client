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
    const Request = await Server.searchCosmetic(query, "backpack");
    if (Request.id) query = Request.id;
    if (Request.name) {
        if (Request.name[lng]) {
            displayName = Request.name[lng];
        } else {
            displayName = Request.name.en;
        };
    }
    await FN.fortnite.party.me.setBackpack("/Game/Athena/Items/Cosmetics/Backpacks/" + query + "." + query);
    FN.fortnite.currentLoadout.backpack = query;
    return await respond(FM.friend.id, i18next.t("msg_bpchanged", {
        ns: "bot",
        lng,
        backpack: displayName
    }));
};

exports.ownerOnly = false;
exports.groupOnly = true;