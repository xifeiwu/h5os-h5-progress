/**
 * Copyright statement of Acadine
 *
 * This software source code is protected by
 * Copyright (c) 2016 Acadine Technologies. All rights reserved.
 *
 * No part of this code may be reproduced, distributed, or transmitted in any
 * form or by any means, including copying or other electronic or mechanical
 * methods, without the prior written permission of Acadine, except as allowed
 * under applicable licenses.
 *
 * Any infringement or unauthorized use, modification, reproduction,
 * distribution, performance or exploitation will be legally actionable.
 */

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
