const {
    prompt
} = require('inquirer');
const fs = require('fs');
const fetch = require("node-fetch");
const pkgfile = require("./package.json");

function convertOldConfig(cfg) {
    let newformat = {
        bot: {
            login: {}
        }
    };
    if (cfg.bot_account) {
        if (cfg.bot_account.email) newformat.bot.login.email = cfg.bot_account.email;
        if (cfg.bot_account.password) newformat.bot.login.password = cfg.bot_account.password;
        if (cfg.bot_account.token_2fa) newformat.bot.login.token_2fa = cfg.bot_account.token_2fa;
    };
    if (cfg.server_url_base) newformat.server_url = cfg.server_url_base;
    if (cfg.preferred_language) newformat.preferred_language = cfg.preferred_language;
    return newformat;
};

let config = {};
try {
    config = require(process.cwd() + "/config.json", "must-exclude");
    if (!config.bot || !config.bot.login) config = convertOldConfig(config); // Converting old 1.0 configuration format
} catch (err) {
    config = {
        bot: {
            login: {},
        },
    };
};

prompt([{
    type: "list",
    name: "locale",
    message: "Please select your language.",
    prefix: "",
    suffix: "",
    choices: async function () {
        let locales = await fs.readdirSync("./locales/");
        return locales.filter(l => l != "dev")
    },
}]).then(answers1 => {
    const i18next = require("i18next");
    const Backend = require("i18next-node-fs-backend");
    i18next.use(Backend).init({
        ns: ["setup"],
        defaultNS: "setup",
        fallbackLng: [answers1.locale],
        backend: {
            loadPath: './locales/{{lng}}/{{ns}}.json',
            addPath: './locales/{{lng}}/{{ns}}.missing.json',
            jsonIndent: 2,
        },
        preload: [answers1.locale],
        debug: false
    }).then(async () => {
        console.log("\n" + i18next.t("welcome", {
            project_name: pkgfile.name
        }) + "\n");
        prompt([{
                type: 'input',
                name: 'fortnite_email',
                message: i18next.t("email_msg"),
                prefix: '-',
                suffix: ':',
                default: function () {
                    if (config.bot && config.bot.login && config.bot.login.email) return config.bot.login.email;
                    return undefined;
                }
            },
            {
                type: 'password',
                name: 'fortnite_password',
                message: i18next.t("password_msg"),
                prefix: '-',
                suffix: ':',
                default: function () {
                    if (config.bot && config.bot.login && config.bot.login.password) return config.bot.login.password;
                    return undefined;
                },
            },
            {
                type: 'input',
                name: 'fortnite_2fa',
                message: i18next.t("2fa.msg"),
                prefix: '-',
                suffix: ':',
                default: function () {
                    if (config.bot && config.bot.login && config.bot.login.token_2fa) return config.bot.login.token_2fa;
                    return undefined;
                },
                validate: function (input) {
                    var done = this.async();
                    if (!input) {
                        return done(null, true);
                    };
                    if (input && input.length <= 40) return done(null, i18next.t("2fa.invalid")); // Needs some work, I don't exactly know how long 2FA tokens are (and if they all have the same length).
                    return done(null, true);
                },
            },
            {
                type: 'input',
                name: 'server_url',
                message: i18next.t("cosmetic_server.msg"),
                prefix: '-',
                suffix: ':',
                default: function () {
                    if (config.server_url) return config.server_url;
                    return "https://fnserver.terax235.com";
                }
            },
            {
                type: 'list',
                name: 'party_privacy',
                message: function () {
                    if (config.party_privacy) {
                        if (config.party_privacy) return i18next.t("party_privacy.msg_current", {
                            v: i18next.t("party_privacy.choices." + config.party_privacy)
                        });
                    } else {
                        return i18next.t("party_privacy.msg");
                    }
                },
                prefix: '-',
                suffix: ':',
                choices: [{
                    name: i18next.t("party_privacy.choices.private"),
                    value: "private"
                }, {
                    name: i18next.t("party_privacy.choices.friends"),
                    value: "friends"
                }, {
                    name: i18next.t("party_privacy.choices.public"),
                    value: "public"
                }],
            },
            {
                type: 'confirm',
                name: 'accept_friends',
                message: i18next.t("accept_friends_msg"),
                prefix: '-',
                suffix: '?'
            },
            {
                type: "input",
                name: "bot_owner",
                message: i18next.t("bot_owner_msg"),
                prefix: "-",
                suffix: ":",
                default: function () {
                    if (config.bot.owner) return config.bot.owner;
                },
            }
        ]).then(async answers => {
            // Build config
            config = {
                bot: {
                    login: {}
                },
            };
            config.bot.login.email = answers.fortnite_email;
            config.bot.login.password = answers.fortnite_password;
            if (answers.fortnite_2fa) config.bot.login.token_2fa = answers.fortnite_2fa;
            config.server_url = answers.server_url;
            config.preferred_language = answers1.locale;
            config.bot.party_privacy = answers.party_privacy;
            config.bot.acceptallfriends = answers.accept_friends;
            config.bot.owner = answers.bot_owner;
            if (config.server_url.split("")[config.server_url.split("").length - 1] == "/") {
                config.server_url = config.server_url.split("").slice(0, config.server_url.split("").length - 1).join("");
            };
            console.log(i18next.t("fetching_build"));
            var build = await fetch(config.server_url + "/api/" + pkgfile.serverVersion + "/build").then(res => res.json()).catch(async err => {
                if (config.server_url.toLowerCase().includes("fnserver.terax235.com")) {
                    config.server_url = "https://fnserver.herokuapp.com";
                    build = await fetch(config.server_url + "/api/" + pkgfile.serverVersion + "/build").then(res => res.json());
                    return;
                };
                return console.error(i18next.t("fetching_build_err", { err }));
            });
            config.build = build;
            await fs.writeFile(process.cwd() + "/config.json", JSON.stringify(config), (err) => {
                if (err) throw err;
                console.log("\n" + i18next.t("done") + "\n");
            });
        });
    });
});