!function(){"use strict";function e(e,t){for(var n=t.split(" "),a=0;a<n.length;a++){var i=n[a];return void 0!==e.classList?e.classList.contains(i):!!e.className.match(new RegExp("(\\s|^)"+i+"(\\s|$)"))}}function t(t,n){for(var a=n.split(" "),i=0;i<a.length;i++){var o=a[i];if(void 0!==t.classList)t.classList.remove(o);else if(e(t,o)){var s=new RegExp("(\\s|^)"+o+"(\\s|$)");t.className=t.className.replace(s," ")}}}function n(n,o,c){if("up"===o?n&&s>=c:n&&c>=s)s=c,i.forEach(function(n,a){a!==c?t(n,"sect-btn-active"):function(t,n){for(var a=n.split(" "),i=0;i<a.length;i++){var o=a[i];void 0!==t.classList?t.classList.add(o):e(t,o)||(t.className+=" "+o)}}(n,"sect-btn-active")});else if(0===c||c===a.length-1){var r=0===c&&"up"===o,f=c===a.length-1&&"down"===o;(r||f)&&(s=0===c&&s!==1/0?-1/0:1/0,i.forEach(function(e,n){t(e,"sect-btn-active")}))}}!function(e){function t(){var e="DIV"!==this.nodeName||"true"===this.getAttribute("data-open");n.setAttribute("data-open",!e),a.setAttribute("data-open",!e)}var n=document.getElementById(e),a=document.getElementById(e+"-target");n.addEventListener("click",t);for(var i=a.getElementsByTagName("a"),o=0;o<i.length;o++)i[o].addEventListener("click",t)}("sidebar-button");var a=Array.prototype.slice.call(document.querySelectorAll(".guide .scroll-section")),i=Array.prototype.slice.call(document.querySelectorAll(".sidebar > ul a")),o=function(e){function t(){a.env._els=[],a.conf.selection.forEach(function(e,t){var n=e.getBoundingClientRect();a.env._els.push({el:e,top:n.top+window.pageYOffset,height:n.height})}),a.env.prevPageYOffset=window.pageYOffset}function n(e){var t=window.innerHeight,n=[],i="load";if(a.env.prevPageYOffset<window.pageYOffset?i="down":a.env.prevPageYOffset>window.pageYOffset&&(i="up"),a.env._els.forEach(function(e,o){var s=e.top+e.height,c=e.el.getAttribute("data-onScreen");if(window.pageYOffset+t*(a.conf.range.top+a.conf.range.height)>e.top&&window.pageYOffset+t*a.conf.range.top<s){if(n.push(!0),"on-screen"===c)return;e.el.setAttribute("data-onScreen","on-screen"),a.conf.cb.call(e.el,!0,i,o)}else{if(n.push(!1),"off-screen"===c)return;e.el.setAttribute("data-onScreen","off-screen"),a.conf.cb.call(e.el,!1,i,o)}}),0===n.filter(function(e){return!0===e}).length){var o=window.pageYOffset>=a.env._els[a.env._els.length-1].top?a.env._els.length-1:0;a.conf.cb.call(a.env._els[o].el,!1,i,o)}a.env.prevPageYOffset=window.pageYOffset}if(e){var a={};return a.conf={selection:[],cb:function(){},range:{top:0,height:1}},a.env={_els:[],prevPageYOffset:null},Object.keys(e).forEach(function(t){a.conf[t]=e[t]}),a.env.activate=function(){t(),window.addEventListener("scroll",n),window.addEventListener("resize",function(){t(),n()}),n()},a.env}}({selection:a,cb:n,range:{top:.22,height:.01}}),s=-1;setTimeout(o.activate,222),setTimeout(o.activate,1e3)}();