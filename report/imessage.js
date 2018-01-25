const { sendIMessageText } = require("../util");

module.exports = (config, date, check, message, lastMessage) =>
  sendIMessageText(
    config.imessage,
    `cafesentry ${date}: [${check}] ${message} (was: ${lastMessage})`
  );

module.exports.checkConfig = config => {
  if (!config.imessage || !config.imessage.phone) {
    throw 'Configure "imessage.phone" in the command line options or configuration file, or disable this reporter.';
  }
};
