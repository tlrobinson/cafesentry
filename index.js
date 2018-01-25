module.exports = config => {
  const errors = [];

  const inits = getModules(config, "init", errors);
  const checks = getModules(config, "check", errors);
  const reports = getModules(config, "report", errors);

  if (errors.length > 0) {
    for (const error of errors) {
      console.warn(error);
    }
    return false;
  }

  for (const [initName, initFn] of inits) {
    initFn(config);
  }

  const state = {};
  const timer = setInterval(() => {
    check(config, checks, reports, state);
  }, 1000);

  return true;
};

async function check(config, checks, reports, state) {
  try {
    for (const [checkName, checkFn] of checks) {
      try {
        const oldState = state[checkName];
        const newState = await checkFn();
        state[checkName] = newState;
        if (oldState != null && oldState !== newState) {
          await report(config, reports, checkName, newState, oldState);
        }
      } catch (e) {
        console.error(`Check ${checkName} failed:`, e);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

async function report(config, reports, check, message, lastMessage) {
  const date = new Date();
  for (const [reportName, reportFn] of reports) {
    try {
      await reportFn(config, date, check, message, lastMessage);
    } catch (e) {
      console.error(`Reporter ${reportName} failed:`, e);
    }
  }
}

function getModule(type, name) {
  // try built-in plugins first, then 3rd party plugins
  const moduleNames = [
    `./${type}/${name}`,
    `cafesentry-plugin-${type}-${name}`
  ];
  for (const moduleName of moduleNames) {
    try {
      require.resolve(moduleName);
    } catch (e) {
      continue;
    }
    return require(moduleName);
  }
  throw `Couldn't find plugin. Did you forget to "npm install -g cafesentry-plugin-${type}-${name}"?`;
}

function getModules(config, type, errors) {
  const modules = [];
  for (const name of config[type]) {
    try {
      const module = getModule(type, name);
      if (module.checkConfig) {
        module.checkConfig(config);
      }
      modules.push([name, module]);
    } catch (message) {
      errors.push(`[${type}-${name}]: ${message}`);
    }
  }
  return modules;
}
