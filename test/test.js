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
