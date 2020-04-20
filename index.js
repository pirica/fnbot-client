const beautify = require('json-beautify')

function configValid (cf) {
  if (!(cf instanceof Object)) { return false };
  if (!cf.bot || !cf.bot.login || !cf.bot.login.email || !cf.bot.login.password || !cf.bot.party_privacy || !cf.bot.owner) { return false };
  if (!cf.server_url || !cf.preferred_language || !cf.build || !(cf.build instanceof Object)) { return false };
  return true
};

JSON.beautify = function (object) {
  return beautify(object, null, 4, 100)
}

if (process.argv[2] && process.argv[2] === '-r') {
  require('./setup.js')
} else {
  try {
    const config = require(process.cwd() + '/config.json', 'must-exclude')
    const configV = configValid(config)
    if (!configV) {
      require('./setup.js')
    } else {
      require('./index_nogui.js')
    };
  } catch (err) {
    require('./setup.js')
  };
};
