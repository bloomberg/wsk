/* --------------------------------------------
 *
 * Write your JavaScript here.
 *
 * It will get rolled up. On `build`, it gets minified.
 * --------------------------------------------
 */

// Here's an example of loading a module
import navToggle from './modules/navToggle.js';
import onScreen from './modules/onScreen.js';
import {addClass, removeClass} from './modules/classUtils.js';

/* --------------------------------------------
 * Sidebar nav click events
 */
navToggle('sidebar-button');

/* --------------------------------------------
 * Scroll sections highlighting
 */
var sectionHeds = Array.prototype.slice.call(document.querySelectorAll('.guide .scroll-section'));
var sectionButtons = Array.prototype.slice.call(document.querySelectorAll('.sidebar > ul a'));

var scrollConf = {
  selection: sectionHeds,
  cb: sectionHighlight,
  range: {top: 0.22, height: 0.01}
};

var oS1 = onScreen(scrollConf);
var lowestVisibleIndex = -1;

function sectionHighlight (visible, direction, index) {
  var show = direction === 'up' ? (visible && lowestVisibleIndex >= index) : (visible && index >= lowestVisibleIndex);

  if (show) {
    lowestVisibleIndex = index;

    sectionButtons.forEach((btn, dex) => {
      if (dex !== index) {
        removeClass(btn, 'sect-btn-active');
      } else {
        addClass(btn, 'sect-btn-active');
      }
    });
  } else {
    if (index === 0 || index === sectionHeds.length - 1) {
      var test1 = index === 0 && direction === 'up';
      var test2 = index === sectionHeds.length - 1 && direction === 'down';
      if (test1 || test2) {
        lowestVisibleIndex = index === 0 && lowestVisibleIndex !== Infinity ? -Infinity : Infinity;
        sectionButtons.forEach((btn, dex) => {
          removeClass(btn, 'sect-btn-active');
        });
      }
    }
  }
}

setTimeout(oS1.activate, 222);
setTimeout(oS1.activate, 1000);
