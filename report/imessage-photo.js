const { sendIMessageFile, takePhoto } = require("../util");

module.exports = async (config, date, check, message, lastMessage) =>
  sendIMessageFile(config.imessage, await takePhoto(config));

module.exports.checkConfig = config => {
  if (!config.imessage || !config.imessage.phone) {
    throw 'Configure "imessage.phone" in the command line options or configuration file, or disable this reporter.';
  }
};
