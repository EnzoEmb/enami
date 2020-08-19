enami is a animation-on-scroll library, similar to libraries like [aos](https://github.com/michalsnik/aos) or [wow.js](https://github.com/matthieua/WOW) but with a few differences, enami uses [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), which is supported on [most new browsers](https://caniuse.com/#feat=intersectionobserver) (Edge Chromium, Firefox, Chrome, Safari), to check when an element is visible, this allows you to trigger animations on horizontal scrolls, when using a smooth-scroll library or inside a slider/carousel. The way this library works its very simple: adds attribute to specified elements when they are visible, and we use CSS animate them.
Also, enami has a few other options that others libraries don't have but that i found very useful:

**Parent/Children system:** Allows you to trigger all the animations inside an element, this prevents problems when you use some animations with delay between them and they end up down on the scroll and getting triggered later.

**Staggering:** A simple way to stagger animations inside an element.

**This is a W.I.P, website with demos, documentation on methods and events coming soon.**

This library is mean to work as a simple way to animate elements on your site, if you intend to do some heavy animations you are maybe looking for libraries like [anime.js](https://github.com/juliangarnier/anime) or [gsap](https://github.com/greensock/GSAP)

you are welcome for my broken english btw, lol
