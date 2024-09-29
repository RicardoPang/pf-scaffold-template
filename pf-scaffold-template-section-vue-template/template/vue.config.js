const PFCliSectionPlugin = require('pf-scaffold-section-plugin');

module.exports = {
  configureWebpack: {
    plugins: [new PFCliSectionPlugin()],
  },
};
