/* global define */
;(function(define){'use strict';define(function(require,exports,module){
/*jshint esnext:true*/

/**
 * Dependencies
 */

var component = require('gaia-component');

/**
 * Exports
 */

module.exports = component.register('h5-progress', {
  created: function() {
    this.setupShadowRoot();

    this.shadowElements = {
      inner: this.shadowRoot.querySelector('.inner'),
      track: this.shadowRoot.querySelector('.track'),
      preTrack: this.shadowRoot.querySelector('.pre-track'),
      postTrack: this.shadowRoot.querySelector('.post-track')
    };

    this.shadowElements.inner.setAttribute('role', 'progressbar');
    this.shadowElements.inner.setAttribute('aria-valuemin', '0');
    this.shadowElements.inner.setAttribute('aria-valuemax', '100');
    this.shadowElements.inner.addEventListener('animationend', function(e) {
      if (e.target === this.shadowElements.track &&
        this.shadowElements.inner.classList.contains('increasing')) {
          this.shadowElements.inner.classList.add('decreasing');
          this.shadowElements.inner.classList.remove('increasing');
      } else if (e.target === this.shadowElements.preTrack &&
        this.shadowElements.inner.classList.contains('decreasing')) {
          this.shadowElements.inner.classList.add('increasing');
          this.shadowElements.inner.classList.remove('decreasing');
      }
    }.bind(this));

    this.value = this.getAttribute('value') || 0;
    this.focused = this.getAttribute('focused');
    this.indeterminate = this.getAttribute('h5-indeterminate');
    this.enableIndeterminateAnimation =
      this.getAttribute('h5-enable-indeterminate-animation');
    this['h5-is-contrast-item'] = this.getAttribute('h5-is-contrast-item');
  },

  fillTime: 2000,

  attrs: {
    value: {
      get: function() { return this._value || 0; },
      set: function(value) {

        // Clamp it
        value = Math.min(100, Math.max(0, Number(value)));

        if (value) {
          var delta = Math.abs(this.value - value);
          var duration = (delta / 100) * this.fillTime;
          this.shadowElements.track.style.width = `${value}%`;
          this.shadowElements.inner.setAttribute('aria-valuenow', value);
        } else {
          this.shadowElements.inner.removeAttribute('aria-valuenow');
        }

        this._value = value;
      }
    },

    focused: {
      get: function() { return this._focused; },
      set: function(value) {
        value = !!(value || value === '');
        this._focused = value;
        if (value) {
          this.shadowElements.inner.classList.add('focused');
        }
      }
    },

    indeterminate: {
      get: function() { return this._indeterminate; },
      set: function(value) {
        value = !!(value || value === '');
        this._indeterminate = value;
        if (value) {
          this.shadowElements.inner.classList.add('indeterminate');
          this.shadowElements.inner.classList.add('increasing');
        }
      }
    },

    enableIndeterminateAnimation: {
      get: function() { return this._enableIndeterminateAnimation; },
      set: function(value) {
        if (!this.indeterminate) {
          // Early return if this progress bar is not indeterminate
          return;
        }

        value = !!(value || value === '');
        this.removeAttribute('h5-enable-indeterminate-animation');
        this._enableIndeterminateAnimation = value;
        // Add `animation-off` class to stop progress bar animation.
        this.shadowElements.inner.classList.toggle('animation-off', !value);
      }
    },

    'h5-is-contrast-item': {
      get: function() { return this._isContrastItem; },
      set: function(value) {
        value = !!(value || value === '');
        if (this._isContrastItem === value) { return; }
        this._isContrastItem = value;
        this.shadowElements.inner.classList.toggle('contrast-item', value);
      }
    }
  },

  template: `
    <div class="inner">
      <div class="pre-track"></div>
      <div class="track"></div>
      <div class="post-track"></div>
    </div>

    <style>

      :host {
        display: block;
        overflow: hidden;
        height: 100%;
        width: 100%;
      }

      .inner {
        width: 100%;
        height: 0.2rem;
        display: flex;
      }

      /*
       * Determinate progress bar
       */

      .track {
        width: 0;
        height: 100%;
        flex-shrink: 0;
        position: relative;

        border-right: 0.4rem solid transparent;
        background: var(--highlight-color, #1c6dea);
        background-clip: padding-box;
        box-sizing: content-box;
        transition: width 500ms cubic-bezier(0.3, 0, 0.4, 1);
      }

      .focused .track {
        background: var(--color-gs00f, #ffffff);
        background-clip: padding-box;
      }

      .focused.contrast-item .track {
        background: var(--color-gs100f, #000000);
        background-clip: padding-box;
      }

      .post-track {
        position: relative;
        background: var(--color-gs65, #6a6a6a);
        width: 100%;
      }

      .pre-track {
        width: 0;
        height: 0.2rem;
        display: none;

        border-right: 0.4rem solid transparent;
        background: var(--color-gs65, #6a6a6a);
        background-clip: padding-box;
        box-sizing: content-box;
        transition: width 200ms cubic-bezier(0.3, 0, 0.4, 1);
      }

      .focused .pre-track,
      .focused .post-track {
        background: rgba(255, 255, 255, 0.3);
        background-clip: padding-box;
      }

      .focused.contrast-item .pre-track,
      .focused.contrast-item .post-track {
        background: rgba(0, 0, 0, 0.3);
        background-clip: padding-box;
      }

      /*
       * Indeterminate progress bar
       */

      .indeterminate .track,
      .indeterminate .pre-track,
      .indeterminate .post-track {
        transition: none;
      }

      .indeterminate.increasing .pre-track {
        width: 0;
      }

      .indeterminate.increasing .track {
        width: 100%;
        animation: increasing 760ms cubic-bezier(0.3, 0, 0.4, 1);
        /* Restore transparent border color when increasing */
        border-color: transparent;
      }

      .indeterminate.increasing .post-track {
        width: 100%;
      }

      .indeterminate.decreasing .pre-track {
        width: 100%;
        display: block;
        flex-shrink: 0;
        animation: increasing 760ms cubic-bezier(0.6, 0, 0.3, 1);
      }

      .indeterminate.decreasing .track {
        width: 100%;
        flex-shrink: 1;
        /* No transparent border color when decreasing */
        border-color: var(--highlight-color, #1c6dea);
      }

      .focused.indeterminate.decreasing .track {
        border-color: var(--color-gs00f, #ffffff);
      }

      .focused.contrast-item.indeterminate.decreasing .track {
        border-color: var(--color-gs100f, #000000);
      }

      .indeterminate.decreasing .post-track {
        width: 0;
      }

      .indeterminate.animation-off .pre-track,
      .indeterminate.animation-off .track,
      .indeterminate.animation-off .post-track {
        animation: none !important;
      }

    </style>
  `,

  globalCss: `
    @keyframes increasing {
      0% { width: 0%; }
      100% { width: 100%; }
    }
  `
});

});})(typeof define=='function'&&define.amd?define
:(function(n,w){'use strict';return typeof module=='object'?function(c){
c(require,exports,module);}:function(c,d){c=(typeof c == 'function')?c:d;
var m={exports:{}};c(function(n){return w[n];},m.exports,m);w[n]=m.exports;};})
('h5-progress',this));
