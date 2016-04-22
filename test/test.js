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
/*global window,assert,suite,setup,teardown,sinon,test*/
/*jshint esnext:true*/

suite('H5Progress', function() {
  'use strict';

  var H5Progress = window['h5-progress'];

  setup(function() {
    this.sandbox = sinon.sandbox.create();
    this.container = document.createElement('div');
  });

  teardown(function() {
    this.sandbox.restore();
    this.container.remove();
  });

  test('First test', function() {

  });
});
