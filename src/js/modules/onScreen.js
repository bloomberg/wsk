/* --------------------------------------------
 *
 * onScreen
 * Pass in an object with a selection and a callback
 * Will trigger callback when element becomes on or off screen
 *
 */

'use strict';

function onScreen (_conf) {
  if (!_conf) return;

  var oS = {};

  oS.conf = {
    selection: [],
    cb: function () {},
    range: {top: 0, height: 1} // expressed as a portion of window height where (top + height) <= 1
  };

  oS.env = {
    _els: [],
    prevPageYOffset: null
  };

  Object.keys(_conf).forEach(key => {
    oS.conf[key] = _conf[key];
  });

  function setSizes () {
    oS.env._els = [];

    oS.conf.selection.forEach(function (el, i) {
      var bcr = el.getBoundingClientRect();
      oS.env._els.push({
        'el': el,
        'top': (bcr.top + window.pageYOffset),
        'height': bcr.height
      });
    });

    oS.env.prevPageYOffset = window.pageYOffset;
  }

  function onScrollEvent (e) {
    var wH = window.innerHeight;
    var allTests = [];

    // Direction logic
    var direction = 'load';
    if (oS.env.prevPageYOffset < window.pageYOffset) {
      direction = 'down';
    } else if (oS.env.prevPageYOffset > window.pageYOffset) {
      direction = 'up';
    }

    oS.env._els.forEach(function (_el, i) {
      var elBottom = _el.top + _el.height;
      var oSAttr = _el.el.getAttribute('data-onScreen');

      // screen test logic
      if (
        window.pageYOffset + (wH * (oS.conf.range.top + oS.conf.range.height)) > _el.top &&
        window.pageYOffset + (wH * oS.conf.range.top) < elBottom
      ) {
        // on screen
        allTests.push(true);
        if (oSAttr === 'on-screen') return;
        _el.el.setAttribute('data-onScreen', 'on-screen');
        oS.conf.cb.call(_el.el, true, direction, i);
      } else {
        // off screen
        allTests.push(false);
        if (oSAttr === 'off-screen') return;
        _el.el.setAttribute('data-onScreen', 'off-screen');
        oS.conf.cb.call(_el.el, false, direction, i);
      }
    });

    if (allTests.filter(t => t === true).length === 0) {
      var dex = window.pageYOffset >= oS.env._els[oS.env._els.length - 1].top ? oS.env._els.length - 1 : 0;
      oS.conf.cb.call(oS.env._els[dex].el, false, direction, dex);
    }

    oS.env.prevPageYOffset = window.pageYOffset;
  }

  function activateOnScreen () {
    setSizes();
    window.addEventListener('scroll', onScrollEvent);
    window.addEventListener('resize', () => { setSizes(); onScrollEvent(); });
    onScrollEvent();
  }

  oS.env.activate = activateOnScreen;

  return oS.env;
}

export default onScreen;
