const { playSound } = require("../util");

module.exports = config => (date, trigger, message, lastMessage) =>
  playSound(__dirname + "/../assets/submarine-diving-alarm-daniel_simon.mp3");
