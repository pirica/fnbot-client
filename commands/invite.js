const {
    i18next
} = require("../structures/i18next.js");

exports.run = async (FM, args, respond, lng, FN) => {
    if (!args[0]) return await respond(FM.friend.id, i18next.t("args_missing", {
        ns: "bot",
        lng
    }));
    var user = args.join(" ");
    try {
        const Profile = await FN.client.getProfile(user);
        const Member = await FN.fortnite.party.findMember(Profile.id);
        if (Member) return await respond(FM.friend.id, i18next.t("invite.is_in_party", {
            ns: "bot",
            lng
        }));
        await FN.fortnite.party.invite(Profile.id);
        return await respond(FM.friend.id, i18next.t("invite.success", {
            ns: "bot",
            lng,
            username: `[${Profile.displayName}]`
        }));
    } catch (err) {
        return await respond(FM.friend.id, i18next.t("invite.error", {
            ns: "bot",
            lng
        }));
    };
};

exports.ownerOnly = true;
exports.groupOnly = false;