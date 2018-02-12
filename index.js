module.exports = config => {
  const errors = [];

  const inits = getModules(config, "init", errors);
  const triggers = getModules(config, "trigger", errors);
  const alerts = getModules(config, "alert", errors);

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
    runTriggers(triggers, alerts, state);
  }, 1000);

  return true;
};

async function runTriggers(triggers, alerts, state) {
  try {
    for (const [triggerName, triggerFn] of triggers) {
      try {
        const oldState = state[triggerName];
        const newState = await triggerFn();
        state[triggerName] = newState;
        if (oldState != null && oldState !== newState) {
          await runAlerts(alerts, triggerName, newState, oldState);
        }
      } catch (e) {
        console.error(`Check ${triggerName} failed:`, e);
      }
    }
  } catch (e) {
    console.error(e);
  }
}

async function runAlerts(alerts, trigger, message, lastMessage) {
  const date = new Date();
  for (const [alertName, alertFn] of alerts) {
    try {
      await alertFn(date, trigger, message, lastMessage);
    } catch (e) {
      console.error(`Reporter ${alertName} failed:`, e);
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
      modules.push([name, module(config)]);
    } catch (message) {
      errors.push(`[${type}-${name}]: ${message}`);
    }
  }
  return modules;
}
