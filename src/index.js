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
  } else if (typeof exports === 'object') {
    module.exports = factory(root);
  } else {
    root.enami = factory(root);
  }
})(typeof global !== 'undefined' ? global : typeof window !== 'undefined' ? window : this, function (window) {

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
  var emitEvent = function (type, element, detail = {}) {
    var event = new CustomEvent(type, detail);
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



  // setup default styles
  var setupStyles = function () {
    var style = document.createElement('style');
    style.innerHTML = `
    [data-enami] {
      opacity: 0.001;
    }
    `;
    document.head.appendChild(style);
  }




  // execute animation in
  var enamiteIn = function (element, settings) {
    emitEvent('enami:animate-in', element)
    // console.log(settings);

    // set delay
    let delay = element.getAttribute("data-enami-delay");
    if (delay && element.style.transitionDelay == "") { // set data-attribute delay if has delay and if dont have already a delay
      // element.style.transitionDelay = delay;
      element.style.animationDelay = delay;
    } else if (settings.delay != null && element.style.transitionDelay == "") { // set property delay
      // element.style.transitionDelay = settings.delay;
      element.style.animationDelay = settings.delay;
    }



    // set duration
    let duration = element.getAttribute("data-enami-duration");
    if (duration) {
      // element.style.transitionDuration = duration;
      element.style.animationDuration = duration;
    } else if (settings.duration != null) {
      // element.style.transitionDuration = settings.duration;
      element.style.animationDuration = settings.duration;
    }

    // add attributes
    element.removeAttribute("data-enami-out");
    // reflow(element);
    element.setAttribute("data-enami-in", "");
  }





  // execute out animation
  var enamiteOut = function (element) {
    emitEvent('enami:animate-out', element)

    // add attributes
    element.removeAttribute("data-enami-in");
    // reflow(element);
    element.setAttribute("data-enami-out", "");
  }





  // reset animations
  var enamiteReset = function (element) {
    // element.style.transition = 'false';
    element.style.animation = 'false';
    element.removeAttribute('data-enami-in')
    // reflow(element);

    setTimeout(function () {
      // element.style.transition = '';
      element.style.animation = '';
    }, 1)

  }





  var reflow = function (element) {
    // console.log(element.offsetHeight);
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


    // set base element selector
    if (settings.selector != null) {
      parentSelector = document.querySelector(settings.selector)
    } else {
      parentSelector = document;
    }


    // elements
    childEnamis = parentSelector.querySelectorAll('[data-enami]')
    parentEnamis = parentSelector.querySelectorAll('[data-enami-children]');





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

      setupStyles();

      // disable on mobile
      if (settings.disableOnMobile == true && isMobile()) {
        return;
      }

      // set intersection observers
      observer = new IntersectionObserver((entries, observer) => {

        entries.forEach(entry => {

          var isParentEnami = entry.target.hasAttribute('data-enami-children');

          if (isParentEnami) {

            let parentStagger = entry.target.getAttribute('data-enami-stagger');
            let parentReset = entry.target.getAttribute('data-enami-reset');
            let childrenClass = entry.target.getAttribute('data-enami-children');
            let childrens = entry.target.querySelectorAll(childrenClass);
            let entryDelay = entry.target.getAttribute('data-enami-delay');
            let childrenAnimation = entry.target.getAttribute('data-enami-animation');



            // setup stagger delay
            if (parentStagger != null) {
              let parentStaggerNumber = secondsToMs(parentStagger);
              let i = 1;
              if (entryDelay != null) { // getting initial staggering delay
                entryDelay = secondsToMs(entryDelay);
              } else if (settings.delay != null) {
                entryDelay = secondsToMs(settings.delay);
              }
              // alert(entryDelay);

              childrens.forEach(children => {
                let delay = parentStaggerNumber * i;
                children.style.animationDelay = (delay + entryDelay) + 'ms';
                i++;

                children.setAttribute('data-enami', childrenAnimation)

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
                  if (parentReset != null || settings.reset) {
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




          
          // destroy method
          enami.destroy = function (element = null) {
            emitEvent('enami:destroy', null, {
              detail: {
                target: (element != null ? document.querySelector(element) : (settings.selector != null ? document.querySelector(settings.selector) : entry.target))
              }
            });

            if (element != null) {
              var e = document.querySelector(element);
              enamiteReset(e)
            }

            observer.disconnect();
            observer = null;
          }





        });



      }, {
        rootMargin: settings.offset,
        threshold: settings.threshold,
        root: settings.root,
      });


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