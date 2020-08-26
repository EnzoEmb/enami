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
    define([], factory(root));
  } else if (typeof exports === 'object') {
    module.exports = factory(root);
  } else {
    root.enami = factory(root);
  }
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

  'use strict';



  var window = root; // Map window to root to avoid confusion

  // Default settings
  var defaults = {
    // element: null,
    offset: '0px 0px 0px 0px',
    delay: 0,
    duration: 400,
    once: true,
    disableOnMobile: false,
    threshold: 0,
    selector: null
  };


  /**
   * Helper functions
   */

  // emit events
  var emitEvent = function (type, element) {
    var event = new CustomEvent(type, {});
    if (element) {
      element.dispatchEvent(event);
    } else {
      document.dispatchEvent(event);
    }
  };

  // detect mobile
  var isMobile = function () {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  // seconds attribute to ms
  var secondsToMs = function (attr) {
    var attr = attr.trim();
    var number = attr.replace(/[^0-9.]/g, '');
    if (attr.endsWith('ms')) {            // is 100ms
      return parseInt(number);
    } else {
      return number * 1000;
    }
  }

  // execute animation in
  var enamiteIn = function (element, settings) {
    emitEvent('enami:animate-in', element)
    // console.log(settings);

    // set delay
    let d = element.getAttribute("data-enami-delay");
    if (d) { // set data-attribute delay
      element.style.transitionDelay = d;
      element.style.animationDelay = d;
    } else if (settings.delay != 0) { // set property delay

      element.style.transitionDelay = settings.delay;
      element.style.animationDelay = settings.delay;
    }

    // set duration
    let duration = element.getAttribute("data-enami-duration");
    if (duration) {
      element.style.transitionDuration = duration;
      element.style.animationDuration = duration;
    }

    // add attributes
    element.removeAttribute("data-enami-out");
    reflow(element);
    element.setAttribute("data-enami-in", "");
  }

  // execute out animation
  var enamiteOut = function (element) {
    emitEvent('enami:animate-out', element)

    // add attributes
    element.removeAttribute("data-enami-in");
    reflow(element);
    element.setAttribute("data-enami-out", "");
  }

  // reset animations
  var enamiteReset = function (element) {
    element.style.transition = 'false';
    element.style.animation = 'false';
    element.removeAttribute('data-enami-in')
    reflow(element);

    setTimeout(function () {
      element.style.transition = '';
      element.style.animation = '';
    }, 1)

  }

  var reflow = function (element) {
    console.log(element.offsetHeight);
  }

  // children logic










  var enami = function (options) {
    var observer, parentEnamis, parentSelector, childEnamis;

    var enami = {}; // Object for public APIs


    // merge settings
    var settings = {
      ...defaults,
      ...options
    };

    if (settings.selector != null) {
      parentSelector = document.querySelector(settings.selector)
    } else {
      parentSelector = document;
    }



    childEnamis = parentSelector.querySelectorAll('[data-enami]')
    parentEnamis = parentSelector.querySelectorAll('[data-enami-children]');

    // destroy method
    enami.destroy = function (options) {
      emitEvent('enami:destroy');
      observer.disconnect();
      observer = null;
    }


    // reset method
    enami.reset = function (element) {
      emitEvent('enami:reset');
      var e = document.querySelector(element);
      enamiteReset(e)
    }


    // update method
    enami.update = function () {
      emitEvent('enami:update');
      enami.destroy();
      init();
    }

    function init() {
      emitEvent('enami:init');

      // disable on mobile
      if (settings.disableOnMobile == true && isMobile()) {
        return;
      }

      // set intersection observers for single elements
      observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {

          if (entry.target.hasAttribute('data-enami-children')) {
            // is parent entry

            let parentStagger = entry.target.getAttribute('data-enami-stagger');
            let parentReset = entry.target.getAttribute('data-enami-reset');
            let childrenClass = entry.target.getAttribute('data-enami-children');
            let childrens = entry.target.querySelectorAll(childrenClass);
            let entryDelay = entry.target.getAttribute('data-enami-delay');
            // console.log(childrens);

            // setup stagger delay
            if (parentStagger != null) {
              let parentStaggerNumber = secondsToMs(parentStagger);
              let i = 1;
              if (entryDelay) { // getting initial staggering delay
                entryDelay = secondsToMs(entryDelay);
              }
              childrens.forEach(children => {
                let delay = parentStaggerNumber * i;
              children.style.transitionDelay = (delay + entryDelay) + 'ms';
                children.style.animationDelay = (delay + entryDelay) + 'ms';
                i++;
              });
            }


            if (entry.isIntersecting) {
              childrens.forEach((children, i) => {
                enamiteIn(children, settings)
              });

              // unobserve parent if has once attribute
              let dataOnce = entry.target.hasAttribute('data-enami-once');
              if (dataOnce || settings.once) {
                observer.unobserve(entry.target);
              }

            } else {
              childrens.forEach(children => {
                if (children.hasAttribute('data-enami-in')) {
                  if (parentReset != null) {
                    enamiteReset(children);
                  } else {

                    enamiteOut(children)
                  }
                }
              });
            }

          } else {
            // is regular entry
            if (entry.isIntersecting) {
              enamiteIn(entry.target, settings)

              // unobserve if has once attribute    
              let dataOnce = entry.target.hasAttribute('data-enami-once');
              if (dataOnce || settings.once) {
                observer.unobserve(entry.target);
              }

            } else if (entry.target.hasAttribute('data-enami-in') && entry.target.hasAttribute('data-enami-reset') == false) {
              enamiteOut(entry.target)
            } else if (entry.target.hasAttribute('data-enami-reset')) {
              enamiteReset(entry.target)
            }
          }



        });

      }, { rootMargin: settings.offset, threshold: settings.threshold });


      // add to observer each single enami
      childEnamis.forEach(enamis => { observer.observe(enamis) });

      // add to observer each parent enami
      parentEnamis.forEach(parent => {
        observer.observe(parent);

        // remove normal observer from childrens
        let childrenClass = parent.getAttribute('data-enami-children');
        let childrens = parent.querySelectorAll(childrenClass);
        childrens.forEach(children => {
          observer.unobserve(children);
        });
      });



    }

    init();

    return enami;
  };
  return enami;
});