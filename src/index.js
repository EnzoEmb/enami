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


  // 'use strict';
  var window = root; // Map window to root to avoid confusion
  var publicMethods = {}; // Placeholder for public methods

  // Default settings
  var defaults = {
    offset: false,
    delay: 0,
    duration: 400,
    once: true,
    disableOnMobile: false,
    threshold: 0
  };


  /**
   * HELPERS
   */
  var emitEvent = function (type, element) {
    // if (!options.emitEvents || typeof window.CustomEvent !== 'function') return;
    var event = new CustomEvent(type, {});
    if (element) {
      element.dispatchEvent(event);
    } else {
      document.dispatchEvent(event);

    }
  };

  function isMobile() {
    return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
  };

  function enimateIn(element) {
    // let dataOnce = element.getAttribute('data-enima-once');
    // console.log(dataOnce);
    // console.log(dataOnce === "true" || dataOnce === "1");
    emitEvent('enima:animate-in', element)


    // set delay
    let d = element.getAttribute("data-enima-delay");
    if (d) {
      element.style.transitionDelay = d;
      element.style.animationDelay = d;
    }

    element.removeAttribute("data-enima-out");
    element.setAttribute("data-enima-in", "");
  }

  function enimateOut(element) {
    emitEvent('enima:animate-out', element)
    element.removeAttribute("data-enima-in", "");
    element.setAttribute("data-enima-out", "");
  }






  publicMethods.init = function (options) {
    console.log('ENIMA INITED');

    emitEvent('enima:init')
    // console.log(defaults)
    // var settings = extend(defaults, options || {});
    var settings = {
      ...defaults,
      ...options
    };

    // console.log(settings)
    if (settings.disableOnMobile == true && isMobile()) {
      return;
    }

    // setNormalElements(settings);
    // setParentElements(settings);

    /**
     * REGULAR ITEMS
     */
    // function setNormalElements(settings) {
    // set intersection observers for elements
    let observer = new IntersectionObserver((entries, observer) => {

      entries.forEach(entry => {
        if (entry.isIntersecting) {
          enimateIn(entry.target)

          // unobserve if has once attribute    
          let dataOnce = entry.target.getAttribute('data-enima-once');
          if (settings.once == true || dataOnce === "true" || dataOnce === "1") {
            observer.unobserve(entry.target);
          }

        } else {
          // } else if(entry.target.hasAttribute('data-enima-in')) {
          // console.log((entry.target));
          enimateOut(entry.target)
        }
      });

    }, { rootMargin: settings.offset, threshold: settings.threshold });

    // create observer for each enima
    document.querySelectorAll('[data-enima]').forEach(enimas => { observer.observe(enimas) });
    // }





    // function setParentElements(settings) {
    /**
     * PARENTING
     */

    //vars
    let parents = document.querySelectorAll('[data-enima-children]');


    //observer
    let parentObserver = new IntersectionObserver((entries, observer) => {

      entries.forEach(entry => {
        let parentStagger = entry.target.getAttribute('data-enima-stagger');
        let childrenClass = entry.target.getAttribute('data-enima-children');
        let childrens = entry.target.querySelectorAll(childrenClass);


        // setup stagger delay
        if (parentStagger != null) {
          let parentStaggerNumber = parentStagger.replace(/[^0-9.]/g, '');
          if (parentStagger.indexOf('s') != -1) {
            parentStaggerNumber = parentStaggerNumber * 100;
          }
          let i = 1;
          childrens.forEach(children => {
            let delay = parentStaggerNumber * i;
            children.style.transitionDelay = delay + 'ms';
            children.style.animationDelay = delay + 'ms';
            i++;
          });
        }


        if (entry.isIntersecting) {
          childrens.forEach(children => {
            enimateIn(children)

            // unobserve if has once attribute    
            // let dataOnce = children.getAttribute('data-enima-once');
            // console.log(dataOnce);
            // if (settings.once == true || dataOnce === "true" || dataOnce === "1") {
            //   observer.unobserve(children);
            // }
          });


        } else {
          childrens.forEach(children => {
            if (children.hasAttribute('data-enima-in')) {
              enimateOut(children)

            }
          });
        }
      });

    }, { rootMargin: settings.offset, threshold: settings.threshold });

    parents.forEach(parent => {
      // add observer to each parent
      parentObserver.observe(parent);

      // remove normal observer from childrens
      let childrenClass = parent.getAttribute('data-enima-children');
      let childrens = parent.querySelectorAll(childrenClass);
      childrens.forEach(children => {
        observer.unobserve(children);
      });

    });

    // }




  };


  publicMethods.destroy = function (options) {
    emitEvent('enima:destroy')

    console.log('DESTRUIDO EN SEGUNDOS');
  }


  return publicMethods;

});