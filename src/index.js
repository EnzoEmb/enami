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
    distance: 0,
  };
  // data-parent

  // /**
  //  * Remove duplicates
  //  * @param {*} value 
  //  * @param {*} index 
  //  * @param {*} self 
  //  */
  // function onlyUnique(value, index, self) {
  //   return self.indexOf(value) === index;
  // }


  /**
   * Merge two or more objects. Returns a new object.
   * @private
   * @param {Boolean}  deep     If true, do a deep (or recursive) merge [optional]
   * @param {Object}   objects  The objects to merge together
   * @returns {Object}          Merged values of defaults and options
   */
  // var extend = function () {

  //   // Variables
  //   var extended = {};
  //   var deep = false;
  //   var i = 0;
  //   var length = arguments.length;

  //   // Check if a deep merge
  //   if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
  //     deep = arguments[0];
  //     i++;
  //   }

  //   // Merge the object into the extended object
  //   var merge = function (obj) {
  //     for (var prop in obj) {
  //       if (Object.prototype.hasOwnProperty.call(obj, prop)) {
  //         // If deep merge and property is an object, merge properties
  //         if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
  //           extended[prop] = extend(true, extended[prop], obj[prop]);
  //         } else {
  //           extended[prop] = obj[prop];
  //         }
  //       }
  //     }
  //   };

  //   // Loop through each object and conduct a merge
  //   for (; i < length; i++) {
  //     var obj = arguments[i];
  //     merge(obj);
  //   }

  //   return extended;

  // };


  function enimateIn(element) {

    // let dataOnce = element.getAttribute('data-enima-once');
    // console.log(dataOnce);
    // console.log(dataOnce === "true" || dataOnce === "1");

    element.removeAttribute("data-enima-out");
    element.setAttribute("data-enima-in", "");

    // set delay
    let d = element.getAttribute("data-enima-delay");
    if(d){
      element.style.transitionDelay = d;

    }
  }

  function enimateOut(element) {

    element.removeAttribute("data-enima-in", "");
    element.setAttribute("data-enima-out", "");
  }


  publicMethods.init = function (options) {
    console.log('ENIMA INITED');
    // console.log(defaults)
    // var settings = extend(defaults, options || {});
    var settings = {
      ...defaults,
      ...options
    };
    // console.log(settings)

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
          enimateOut(entry.target)
        }
      });

    }, { rootMargin: settings.offset });

    // create observer for each enima
    document.querySelectorAll('[data-enima]:not([data-enima-parent])').forEach(enimas => { observer.observe(enimas) });



    // set intersection observer for parents
    let parentObserver = new IntersectionObserver((pEntries, pObserver) => {

      pEntries.forEach(entry => {

        let parentSelector = entry.target.getAttribute('data-enima-parent-name');
        let parentElement = document.querySelector(parentSelector);
        let parentChildrens = entry.target.querySelectorAll('[data-enima-parent="' + parentSelector + '"]');
        let parentStagger = parentElement.getAttribute('data-enima-stagger');
        // console.log(parentStagger);

        // setup stagger delay
        if (parentStagger != null) {
          let parentStaggerNumber = parentStagger.replace(/\D/g, '');
          // let isMs = false;
          if (parentStagger.indexOf('ms') != -1) {
          // let isMs = true;
          // console.log(parentStagger.indexOf('ms'))
            // console.log('HAS MS');

          }
          else if (parentStagger.indexOf('s') != -1) {
            // console.log(parentStaggerNumber*100);
            parentStaggerNumber = parentStaggerNumber*100;
            // console.log(parentStagger.indexOf('s'))
            // console.log('HAS S');
          }

          let i = 1;
          parentChildrens.forEach(e => {
            // console.log(e);
            let delay = parentStaggerNumber * i;
            // console.log(delay); 
            // if(isMs){
              e.style.transitionDelay = delay+'ms';
            // }else{
            //   e.style.transitionDelay = '.'+delay+'s';
            // }
            // element.style[styleproperty] = valuestring;
            // e.style.setProperty('transition-delay','1s');
            i++;
          });


        }


        if (entry.isIntersecting) {

          // enimate elements
          parentChildrens.forEach(e => {
            enimateIn(e)
            // unobserve if has once attribute    
            let dataOnce = e.getAttribute('data-enima-once');
            if (settings.once == true || dataOnce === "true" || dataOnce === "1") {
              pObserver.unobserve(parentElement);
            }
          });
        } else {
          parentChildrens.forEach(e => {
            enimateOut(e)
          });
        }
      });

    }, { rootMargin: settings.offset });
    // }, { rootMargin: "0px 0px 0px 0px" });


    // create observer for each parent
    let parents = [];
    let enimaWithParents = document.querySelectorAll('[data-enima-parent]')
    enimaWithParents.forEach(e => {
      parents.push(e.getAttribute('data-enima-parent'));
    });
    let parentsFilter = [...new Set(parents)];
    parentsFilter.forEach(e => {
      document.querySelector(e).setAttribute('data-enima-parent-name', e);
      parentObserver.observe(document.querySelector(e))
    });



  };


  return publicMethods;

});