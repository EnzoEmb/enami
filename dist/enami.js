"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/*!
 * enami
 * Animation on scroll
 * 2020 Enzo Vergara
 * MIT License
 * https://github.com/enzoemb/enami
 */

/**
 * Based on cferdinandi's starter template
 * https://gist.github.com/cferdinandi/57c96241114fc6e8ce6cd2c5bfeeb346
 */
(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], function () {
      return factory(root);
    });
  } else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === 'object') {
    module.exports = factory(root);
  } else {
    root.enami = factory(root);
  }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : void 0, function (window) {
  'use strict';

  var window = window.root; // Map window to root to avoid confusion
  // Default settings

  var defaults = {
    // element: null,
    offset: '0px 0px 0px 0px',
    delay: null,
    duration: null,
    once: true,
    disableOnMobile: false,
    threshold: 0,
    selector: null,
    root: null,
    reset: false
  };
  /**
   * Helper functions
   */
  // emit events

  var emitEvent = function emitEvent(type, element) {
    var event = new CustomEvent(type, {});

    if (element) {
      element.dispatchEvent(event);
    } else {
      document.dispatchEvent(event);
    }
  }; // detect mobile


  var isMobile = function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  }; // seconds attribute to ms


  var secondsToMs = function secondsToMs(attr) {
    var attr = attr.trim();
    var number = attr.replace(/[^0-9.]/g, '');

    if (attr.endsWith('ms')) {
      // is 100ms
      return parseInt(number);
    } else {
      return number * 1000;
    }
  }; // setup default styles


  var setupStyles = function setupStyles() {
    var style = document.createElement('style');
    style.innerHTML = "\n    [data-enami] {\n      opacity: 0.001;\n    }\n    ";
    document.head.appendChild(style);
  }; // execute animation in


  var enamiteIn = function enamiteIn(element, settings) {
    emitEvent('enami:animate-in', element); // console.log(settings);
    // set delay

    var delay = element.getAttribute("data-enami-delay");

    if (delay && element.style.transitionDelay == "") {
      // set data-attribute delay if has delay and if dont have already a delay
      // element.style.transitionDelay = delay;
      element.style.animationDelay = delay;
    } else if (settings.delay != null && element.style.transitionDelay == "") {
      // set property delay
      // element.style.transitionDelay = settings.delay;
      element.style.animationDelay = settings.delay;
    } // set duration


    var duration = element.getAttribute("data-enami-duration");

    if (duration) {
      // element.style.transitionDuration = duration;
      element.style.animationDuration = duration;
    } else if (settings.duration != null) {
      // element.style.transitionDuration = settings.duration;
      element.style.animationDuration = settings.duration;
    } // add attributes


    element.removeAttribute("data-enami-out"); // reflow(element);

    element.setAttribute("data-enami-in", "");
  }; // execute out animation


  var enamiteOut = function enamiteOut(element) {
    emitEvent('enami:animate-out', element); // add attributes

    element.removeAttribute("data-enami-in"); // reflow(element);

    element.setAttribute("data-enami-out", "");
  }; // reset animations


  var enamiteReset = function enamiteReset(element) {
    // element.style.transition = 'false';
    element.style.animation = 'false';
    element.removeAttribute('data-enami-in'); // reflow(element);

    setTimeout(function () {
      // element.style.transition = '';
      element.style.animation = '';
    }, 1);
  };

  var reflow = function reflow(element) {// console.log(element.offsetHeight);
  }; // children logic


  var enami = function enami(options) {
    var observer, parentEnamis, parentSelector, childEnamis;
    var enami = {}; // Object for public APIs
    // merge settings

    var settings = _objectSpread(_objectSpread({}, defaults), options); // set base element selector


    if (settings.selector != null) {
      parentSelector = document.querySelector(settings.selector);
    } else {
      parentSelector = document;
    } // elements


    childEnamis = parentSelector.querySelectorAll('[data-enami]');
    parentEnamis = parentSelector.querySelectorAll('[data-enami-children]'); // destroy method

    enami.destroy = function () {
      var element = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      emitEvent('enami:destroy');

      if (element != null) {
        var e = document.querySelector(element);
        enamiteReset(e);
      }

      observer.disconnect();
      observer = null;
    }; // reset method


    enami.reset = function (element) {
      emitEvent('enami:reset');
      var e = document.querySelector(element);
      enamiteReset(e);
    }; // update method


    enami.update = function () {
      emitEvent('enami:update');
      enami.destroy();
      init();
    };

    function init() {
      emitEvent('enami:init');
      setupStyles(); // disable on mobile

      if (settings.disableOnMobile == true && isMobile()) {
        return;
      } // set intersection observers


      observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(function (entry) {
          var isParentEnami = entry.target.hasAttribute('data-enami-children');

          if (isParentEnami) {
            var parentStagger = entry.target.getAttribute('data-enami-stagger');
            var parentReset = entry.target.getAttribute('data-enami-reset');
            var childrenClass = entry.target.getAttribute('data-enami-children');
            var childrens = entry.target.querySelectorAll(childrenClass);
            var entryDelay = entry.target.getAttribute('data-enami-delay');
            var childrenAnimation = entry.target.getAttribute('data-enami-animation'); // setup stagger delay

            if (parentStagger != null) {
              var parentStaggerNumber = secondsToMs(parentStagger);
              var i = 1;

              if (entryDelay != null) {
                // getting initial staggering delay
                entryDelay = secondsToMs(entryDelay);
              } else if (settings.delay != null) {
                entryDelay = secondsToMs(settings.delay);
              } // alert(entryDelay);


              childrens.forEach(function (children) {
                var delay = parentStaggerNumber * i;
                children.style.animationDelay = delay + entryDelay + 'ms';
                i++;
                children.setAttribute('data-enami', childrenAnimation);
              });
            }

            if (entry.isIntersecting) {
              childrens.forEach(function (children, i) {
                enamiteIn(children, settings);
              }); // unobserve parent if has once attribute

              var dataOnce = entry.target.hasAttribute('data-enami-once');

              if (dataOnce || settings.once) {
                observer.unobserve(entry.target);
              }
            } else {
              childrens.forEach(function (children) {
                if (children.hasAttribute('data-enami-in')) {
                  if (parentReset != null || settings.reset) {
                    enamiteReset(children);
                  } else {
                    enamiteOut(children);
                  }
                }
              });
            }
          } else {
            // is regular entry
            if (entry.isIntersecting) {
              enamiteIn(entry.target, settings); // unobserve if has once attribute    

              var _dataOnce = entry.target.hasAttribute('data-enami-once');

              if (_dataOnce || settings.once) {
                observer.unobserve(entry.target);
              }
            } else if (entry.target.hasAttribute('data-enami-in') && entry.target.hasAttribute('data-enami-reset') == false) {
              enamiteOut(entry.target);
            } else if (entry.target.hasAttribute('data-enami-reset')) {
              enamiteReset(entry.target);
            }
          }
        });
      }, {
        rootMargin: settings.offset,
        threshold: settings.threshold,
        root: settings.root
      }); // add to observer each single enami

      childEnamis.forEach(function (enamis) {
        observer.observe(enamis);
      }); // add to observer each parent enami

      parentEnamis.forEach(function (parent) {
        observer.observe(parent); // remove normal observer from childrens

        var childrenClass = parent.getAttribute('data-enami-children');
        var childrens = parent.querySelectorAll(childrenClass);
        childrens.forEach(function (children) {
          observer.unobserve(children);
        });
      });
    }

    init();
    return enami;
  };

  return enami;
});