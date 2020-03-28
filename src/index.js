/*!
 * enima-js
 * Animation on scroll
 * 2020 Enzo Vergara
 * MIT License
 * https://github.com/enzoemb/enima
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
    root.enima = factory(root);
  }
})(typeof global !== 'undefined' ? global : this.window || this.global, function (root) {

  'use strict';


  var window = root; // Map window to root to avoid confusion
  var publicMethods = {}; // Placeholder for public methods

  // Default settings
  var defaults = {
    element: null,
    offset: '0px 0px 0px 0px',
    delay: 0,
    duration: 400,
    once: true,
    disableOnMobile: false,
    threshold: 0
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
      return number;
    } else {
      return number * 1000;
    }

    // if (attr.startsWith('.')) {    // is .1s
    //   return number * 1000;
    // } else {                              // is 1s
    //   return number * 1000;
    // }
  }

  // execute animation in
  var enimateIn = function (element) {
    emitEvent('enima:animate-in', element)

    // set delay
    let d = element.getAttribute("data-enima-delay");
    if (d) {
      element.style.transitionDelay = d;
      element.style.animationDelay = d;
    }

    // set duration
    let duration = element.getAttribute("data-enima-duration");
    if (duration) {
      element.style.transitionDuration = duration;
      element.style.animationDuration = duration;
    }

    // add attributes
    element.removeAttribute("data-enima-out");
    element.setAttribute("data-enima-in", "");
  }

  // execute out animation
  var enimateOut = function (element) {
    emitEvent('enima:animate-out', element)

    // add attributes
    element.removeAttribute("data-enima-in", "");
    element.setAttribute("data-enima-out", "");
  }







  // return publicMethods;
  var enima = function (options) {
    var parentObserver, observer, parentEnimas, parentSelector;
    //
    // Variables
    //


    // if (selector == null) {
    //   selector = document;
    // }
    // console.log(selector);
    // console.log(options);


    var enima = {}; // Object for public APIs
    // var settings, anchor, toggle, fixedHeader, eventTimeout, animationInterval;

    // enima.animateScroll = function (anchor, toggle, options) {


    // merge settings
    var settings = {
      ...defaults,
      ...options
    };
    if (parentSelector) {
      parentSelector = document.querySelector(settings.parentSelector)
    } else {
      parentSelector = document;
    }

    // };


    // destroy methdo
    enima.destroy = function (options) {
      emitEvent('enima:destroy');
      parentObserver.disconnect();
      observer.disconnect();
      parentObserver = null;
      observer = null;
      console.log(parentObserver);
    }


    // destroy methdo
    enima.reset = function (element) {
      // console.log(element)
      emitEvent('enima:reset');
      var e = document.querySelector(element);
      // console.log(e);
      e.style.transition = 'false';
      e.style.animation = 'false';
      // e.style.transitionDuration = '0s';
      // e.style.transitionDuration = '0s';
      // e.style.animationDuration = '0s';
      // e.style.transitionDelay = '0s';
      // e.style.animationDelay = '0s';
      e.removeAttribute('data-enima-in')

      setTimeout(function () {

        e.style.transition = '';
        e.style.animation = '';
        // e.style.transitionDuration = '';
        // e.style.animationDuration = '';
        // e.style.transitionDelay = '';
        // e.style.animationDelay = '';

        e.setAttribute('data-enima-in', "")
      }, 1)

    }


    enima.update = function () {
      enima.destroy();
      init();
    }


    function init() {

      emitEvent('enima:init');

      // disable on mobile
      if (settings.disableOnMobile == true && isMobile()) {
        return;
      }

      // set intersection observers for single elements
      observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {
          if (entry.isIntersecting) {
            enimateIn(entry.target)

            // unobserve if has once attribute    
            let dataOnce = entry.target.getAttribute('data-enima-once');
            if (settings.once == true || dataOnce === "true" || dataOnce === "1") {
              observer.unobserve(entry.target);
            }

          } else if (entry.target.hasAttribute('data-enima-in') && entry.target.hasAttribute('data-enima-reset') == false) {
            enimateOut(entry.target)
          } else if (entry.target.hasAttribute('data-enima-reset')) {
            entry.target.style.transition = 'false';
            entry.target.style.animation = 'false';
            entry.target.removeAttribute('data-enima-in')

            setTimeout(function () {

              entry.target.style.transition = '';
              entry.target.style.animation = '';
              //  children.setAttribute('data-enima-in', "")
            }, 1)
          }
        });

      }, { rootMargin: settings.offset, threshold: settings.threshold });

      // create observer for each enima
      console.log(parentSelector);
      parentSelector.querySelectorAll('[data-enima]').forEach(enimas => { observer.observe(enimas) });



      /**
       * Parenting
       */

      //vars
      parentEnimas = parentSelector.querySelectorAll('[data-enima-children]');

      //observer
      parentObserver = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {
          let parentStagger = entry.target.getAttribute('data-enima-stagger');
          let parentReset = entry.target.getAttribute('data-enima-reset');
          let childrenClass = entry.target.getAttribute('data-enima-children');
          let childrens = entry.target.querySelectorAll(childrenClass);
          // console.log(childrens);

          // setup stagger delay
          if (parentStagger != null) {
            let parentStaggerNumber = secondsToMs(parentStagger);
            let i = 1;
            childrens.forEach(children => {
              let delay = parentStaggerNumber * i;
              children.style.transitionDelay = delay + 'ms';
              children.style.animationDelay = delay + 'ms';
              i++;
            });
          }


          if (entry.isIntersecting) {
            childrens.forEach((children, i) => {
              enimateIn(children)
            });

            // unobserve parent if has once attribute
            let dataOnce = entry.target.getAttribute('data-enima-once');
            if (settings.once == true || dataOnce === "true" || dataOnce === "1") {
              observer.unobserve(entry.target);
            }

          } else {
            childrens.forEach(children => {
              if (children.hasAttribute('data-enima-in')) {
                if (parentReset != null) {


                  children.style.transition = 'false';
                  children.style.animation = 'false';
                  children.removeAttribute('data-enima-in')

                  setTimeout(function () {

                    children.style.transition = '';
                    children.style.animation = '';
                    //  children.setAttribute('data-enima-in', "")
                  }, 1)



                } else {
                  enimateOut(children)

                }

              }
            });
          }
        });

      }, { rootMargin: settings.offset, threshold: settings.threshold });


      // setup parent enimas
      parentEnimas.forEach(parent => {
        // add observer to each parent
        parentObserver.observe(parent);

        // remove normal observer from childrens
        let childrenClass = parent.getAttribute('data-enima-children');
        let childrens = parent.querySelectorAll(childrenClass);
        childrens.forEach(children => {
          observer.unobserve(children);
        });
      });



    }

    init();

    //
    // Public APIs
    //

    return enima;

  };

  return enima;

});