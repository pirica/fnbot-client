function configValid(cf) {
    if (!cf instanceof Object) return false;
    if (!cf.bot || !cf.bot.login || !cf.bot.login.email || !cf.bot.login.password || !cf.bot.party_privacy || !cf.bot.acceptallfriends || !cf.bot.owner) return false;
    if (!cf.server_url || !cf.preferred_language || !cf.build || !cf.build instanceof Object) return false;
    return true;
};

if (process.argv[2] && process.argv[2] == "-r") {
    return require("./setup.js");
};
try {
    const config = require(process.cwd() + "/config.json", "must-exclude");
    const configV = configValid(config);
    if (!configV) {
        return require("./setup.js");
    };
} catch (err) {
    return require("./setup.js");
};

return require("./index_nogui.js");