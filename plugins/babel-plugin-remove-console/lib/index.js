//@ts-check
/**
 * @param {{types: import('@babel/core').types}} api
 * @returns {import("@babel/core").PluginObj}
 */

module.exports = function (api) {
  const { types: t } = api;

  return {
    name: "remove-console",
    visitor: {
      CallExpression(path) {
        const { callee } = path.node;
        if (
          t.isMemberExpression(callee) &&
          t.isIdentifier(callee.object, { name: "console" }) &&
          t.isIdentifier(callee.property, { name: "log" })
        ) {
          path.remove();
        }
      },
    },
  };
};

// Babel-preset-env

// Babel also maintains a kind of plugin(a preset) called [`preset-env`](https://babeljs.io/docs/babel-preset-env). It provides Babel with all the [necessary plugins](https://github.com/babel/babel/blob/main/packages/babel-preset-env/src/available-plugins.ts) needed to transform to match target browers or platforms. This lets you take advantage of all the cool new language features without needing to micromanage which syntax transforms or browser polyfills are needed by your target environment(s). 

// `preset-env` enables you to use the latest and greatest JavScript features. Essentially, it ships with new plugins for features that have reached[stage 3](https://www.proposals.es/stages/stage3) in the TC39 process. It also lets you configure what platforms you are targetting so it can automatically figure out what plugins to use. To read about the process that new JavaScript features undergo before they make it to JavaScript engines, see: [TC39 process document](https://tc39.es/process-document/)