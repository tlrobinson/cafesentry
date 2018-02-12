const { exec } = require("child-process-promise");

const EXCLUDED_DEVICES = /^Root$|^Root Hub Simulation Simulation|^iBridge/;

module.exports = config => async () =>
  (await exec("ioreg -p IOUSB")).stdout
    .split("\n")
    .map(line => line.match(/\+\-o\s*([^<]+)\s*</))
    .filter(m => m)
    .map(m => m[1].trim())
    .filter(device => !EXCLUDED_DEVICES.test(device))
    .join(", ");
