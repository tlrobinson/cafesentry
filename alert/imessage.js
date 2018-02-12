const { sendIMessageText } = require("../util");

module.exports = config => {
  if (!config.imessage || !config.imessage.phone) {
    throw 'Configure "imessage.phone" in the command line options or configuration file, or disable this alerter.';
  }
  return (date, trigger, message, lastMessage) =>
    sendIMessageText(
      config.imessage,
      `cafesentry ${date}: [${trigger}] ${message} (was: ${lastMessage})`
    );
};
