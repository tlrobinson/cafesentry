const { sendIMessageFile, takePhoto } = require("../util");

module.exports = config => {
  if (!config.imessage || !config.imessage.phone) {
    throw 'Configure "imessage.phone" in the command line options or configuration file, or disable this alerter.';
  }
  return async (date, trigger, message, lastMessage) =>
    sendIMessageFile(config.imessage, await takePhoto(config));
};
