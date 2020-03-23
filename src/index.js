/*!
 * enima-js
 * Animation on scroll
 * 2020 Enzo Vergara
 * MIT License
 * https://github.com/enzoemb/enima
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
    once: false,
    mirror: false,
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
  var extend = function () {

    // Variables
    var extended = {};
    var deep = false;
    var i = 0;
    var length = arguments.length;

    // Check if a deep merge
    if (Object.prototype.toString.call(arguments[0]) === '[object Boolean]') {
      deep = arguments[0];
      i++;
    }

    // Merge the object into the extended object
    var merge = function (obj) {
      for (var prop in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, prop)) {
          // If deep merge and property is an object, merge properties
          if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
            extended[prop] = extend(true, extended[prop], obj[prop]);
          } else {
            extended[prop] = obj[prop];
          }
        }
      }
    };

    // Loop through each object and conduct a merge
    for (; i < length; i++) {
      var obj = arguments[i];
      merge(obj);
    }

    return extended;

  };


  function enimateIn(element) {

  }

  function enimateOut() {

  }


  publicMethods.init = function (options) {
    console.log('ENIMA INITED');
    // Code goes here...

    // Merge user options with defaults
    var settings = extend(defaults, options || {});

    // set intersection observers for elements
    let observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.removeAttribute("data-enima-out");
          entry.target.setAttribute("data-enima-in", "");

          // set delay
          let d = entry.target.getAttribute("data-enima-delay");
          entry.target.style.transitionDelay = d;
        } else {
          entry.target.removeAttribute("data-enima-in", "");
          entry.target.setAttribute("data-enima-out", "");
        }
      });
    }, { rootMargin: "0px 0px 0px 0px" });

    // create observer for each enima
    document.querySelectorAll('[data-enima]:not([data-enima-parent])').forEach(enimas => { observer.observe(enimas) });



    // set intersection observer for parents
    let parentObserver = new IntersectionObserver((pEntries, pObserver) => {
      // console.log(pObserver);
      pEntries.forEach(entry => {

        let parentSelector = entry.target.getAttribute('data-enima-parent-name');
        let parentChildrens = entry.target.querySelectorAll('[data-enima-parent="' + parentSelector + '"]');
        if (entry.isIntersecting) {
          parentChildrens.forEach(e => {
            e.removeAttribute("data-enima-out");
            e.setAttribute("data-enima-in", "");

            // set delay
            let d = e.getAttribute("data-enima-delay");
            e.style.transitionDelay = d;
          });
        } else {
          parentChildrens.forEach(e => {
            e.removeAttribute("data-enima-in", "");
            e.setAttribute("data-enima-out", "");
          });
        }
      });
    }, { rootMargin: "0px 0px 0px 0px" });

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