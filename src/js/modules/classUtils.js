/* --------------------------------------------
 *
 * Class parsing functionality
 * hasClass, addClass, removeClass
 *
 */

'use strict';

export function hasClass (el, className) {
  var classList = className.split(' ');
  for (var i = 0; i < classList.length; i++) {
    var thisClass = classList[i];
    if (typeof el.classList !== 'undefined') {
      return el.classList.contains(thisClass);
    } else {
      return !!el.className.match(new RegExp('(\\s|^)' + thisClass + '(\\s|$)'));
    }
  }
}

export function addClass (el, className) {
  var classList = className.split(' ');
  for (var i = 0; i < classList.length; i++) {
    var thisClass = classList[i];
    if (typeof el.classList !== 'undefined') {
      el.classList.add(thisClass);
    } else {
      if (!hasClass(el, thisClass)) el.className += ' ' + thisClass;
    }
  }
}

export function removeClass (el, className) {
  var classList = className.split(' ');
  for (var i = 0; i < classList.length; i++) {
    var thisClass = classList[i];
    if (typeof el.classList !== 'undefined') {
      el.classList.remove(thisClass);
    } else if (hasClass(el, thisClass)) {
      var reg = new RegExp('(\\s|^)' + thisClass + '(\\s|$)');
      el.className = el.className.replace(reg, ' ');
    }
  }
}

export default {hasClass, addClass, removeClass};
