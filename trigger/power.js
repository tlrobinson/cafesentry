const { exec } = require("child-process-promise");

module.exports = config => async () =>
  (await exec("pmset -g batt")).stdout.match(/Now drawing from '([^']+)'/)[1];
