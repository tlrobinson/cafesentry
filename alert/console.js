module.exports = config => (date, trigger, message, lastMessage) =>
  console.warn(
    `cafesentry ${date}: [${trigger}] ${message} (was: ${lastMessage})`
  );
