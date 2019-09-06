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
    var setBackpack = false;
    const Request = await Server.searchCosmetic(query, "skin");
    if (Request.id) query = Request.id;
    if (Request.name) {
        if (Request.name[lng]) {
            displayName = Request.name[lng];
        } else {
            displayName = Request.name.en;
        };
    };
    if (Request.setParts && Request.setParts[0]) {
        if (Request.setParts.filter(p => p.matchesSkin)[0]) {
            setBackpack = Request.setParts.filter(p => p.matchesSkin)[0].id;
        } else {
            if (Request.setParts.filter(p => p.type == "backpack").length == 1) {
                setBackpack = Request.setParts.filter(p => p.type == "backpack")[0].id;
            };
        };
    };
    await FN.fortnite.party.me.setOutfit("/Game/Athena/Items/Cosmetics/Characters/" + query + "." + query);
    FN.fortnite.currentLoadout.skin = query;
    if (FN.fortnite.currentLoadout.emote) {
        await FN.fortnite.party.me.clearEmote();
        await FN.fortnite.party.me.setEmote("/Game/Athena/Items/Cosmetics/Dances/" + FN.fortnite.currentLoadout.emote + "." + FN.fortnite.currentLoadout.emote)
    };
    if (setBackpack && !FN.fortnite.currentLoadout.backpack) {
        await FN.fortnite.party.me.setBackpack("/Game/Athena/Items/Cosmetics/Backpacks/" + setBackpack + "." + setBackpack);
    };
    return await respond(FM.friend.id, i18next.t("msg_skinchanged", {
        ns: "bot",
        lng,
        skin: displayName
    }));
};

exports.ownerOnly = false;
exports.groupOnly = true;