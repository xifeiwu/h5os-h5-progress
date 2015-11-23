
module.exports = function(config) {
  config.set({
    frameworks: ['mocha', 'sinon-chai'],
    browsers: ['firefox_latest'],
    client: { mocha: { 'ui': 'tdd' } },
    basePath: '../',

    customLaunchers: {
      firefox_latest: {
        base: 'FirefoxNightly',
        prefs: { 'dom.webcomponents.enabled': true }
      }
    },

    files: [
      'bower_components/gaia-component/gaia-component.js',
      'h5-progress.js',
      'test/test.js'
    ],

    proxies: {
      '/bower_components/': 'http://localhost:9876/base/bower_components/' },
  });
};
