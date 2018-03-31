const { compose } = require('react-app-rewired');
const rewireTypescript = require('react-app-rewire-typescript');

module.exports = function override(config, env) {
  const rewires = compose(
      rewireTypescript
  );

  return rewires(config, env);
}
