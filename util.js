const { exec, execFile } = require("child-process-promise");
const { spawn } = require("child_process");
const esa = require("escape-string-applescript");

const lockScreen = (exports.lockScreen = function() {
  return exec("open -a ScreenSaverEngine");
});

const applescript = (exports.applescript = function(lines) {
  lines = typeof lines === "string" ? [lines] : lines;
  return execFile("osascript", [].concat(...lines.map(line => ["-e", line])));
});

const sendIMessage = (exports.sendIMessage = function(imessageConfig, content) {
  return applescript(`
    tell application "Messages"
    	set targetMessage to ${content}
    	set targetBuddyPhone to "${imessageConfig.phone}"
    	set targetService to 1st service whose service type = iMessage
    	set targetBuddy to buddy targetBuddyPhone of targetService
    	send targetMessage to targetBuddy
    end tell
  `);
});

const sendIMessageText = (exports.sendIMessageText = function(
  imessageConfig,
  message
) {
  return sendIMessage(imessageConfig, `"${esa(message)}"`);
});

const sendIMessageFile = (exports.sendIMessageFile = function(
  imessageConfig,
  path
) {
  return sendIMessage(imessageConfig, `(POSIX file "${esa(path)}")`);
});

const takePhoto = (exports.takePhoto = async function(config) {
  const path = `${process.cwd()}/${Date.now()}.jpg`;
  await exec(
    `ffmpeg -f avfoundation -video_size 1280x720 -framerate 30 -i 0 -vframes 1 "${path}"`
  );
  return path;
});

const takeVideo = (exports.takeVideo = async function(config, seconds = 5) {
  const path = `${process.cwd()}/${Date.now()}.mpg`;
  await exec(
    `ffmpeg -f avfoundation -video_size 1280x720 -framerate 30 -i 0 -vframes ${seconds *
      30} "${path}"`
  );
  return path;
});

const sleepwatcher = (exports.sleepwatcher = function() {
  const p = spawn("sleepwatcher", [
    "-cecho cantsleep",
    "-secho sleep",
    "-wecho wakeup",
    "-Decho displaydim",
    "-Eecho displayundim",
    "-Secho displaysleep",
    "-Wecho displaywakeup",
    "-Pecho plug",
    "-Uecho unplug"
    // "-iecho idle",
    // "-Recho idleresume",
    // "-recho resume",
    // "-b", "5",
    // "-t", "5",
  ]);
  p.stdout.setEncoding("utf-8");
  p.stdout.on("data", data => console.log("event", data.trim()));
  return p;
});
