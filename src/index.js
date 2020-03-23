// var statusBox = document.getElementById("statusBox");
// var statusText = document.getElementById("statusText");

// function handler(entries, observer) {
//   for (entry of entries) {
//     console.log(entry);

//     statusText.textContent = entry.isIntersecting;

//     if (entry.isIntersecting) {
//       statusBox.className = "yes";
//     } else {
//       statusBox.className = "no";
//     }
//   }
// }

// /* By default, invokes the handler whenever:
//    1. Any part of the target enters the viewport
//    2. The last part of the target leaves the viewport */

// let observer = new IntersectionObserver(handler);
// observer.observe(document.getElementById("target"));






// function enima(options){
//   this.name = "test";
// }

// enima.prototype.init = function() {
//   var self = this;
//   console.log('HOLA');

// };


// module.exports = enima;
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


  // var enima = {};
  publicMethods.init = function (options) {
    console.log('HOLA');
    // Code goes here...

    // Merge user options with defaults
    var settings = extend(defaults, options || {});


    const onIntersection = (entries) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          // console.log(entry);
          entry.target.classList.add("enter-animation");
        }
      }
    };

    const observer = new IntersectionObserver(onIntersection);
    observer.observe(document.querySelector('.box-4'));






    //
  };
  return publicMethods;

});