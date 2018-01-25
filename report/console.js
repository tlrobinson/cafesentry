module.exports = (config, date, check, message, lastMessage) =>
  console.warn(
    `cafesentry ${date}: [${check}] ${message} (was: ${lastMessage})`
  );
