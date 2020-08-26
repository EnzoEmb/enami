# enami
enami is a animation-on-scroll library, similar to libraries like [aos](https://github.com/michalsnik/aos) or [wow.js](https://github.com/matthieua/WOW) but with a few differences, enami uses [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), which is supported on [most new browsers](https://caniuse.com/#feat=intersectionobserver) (Edge Chromium, Firefox, Chrome, Safari), to check when an element is visible, this allows you to trigger animations on horizontal scrolls, when using a smooth-scroll library or inside a slider/carousel. The way this library works its very simple: adds attribute to specified elements when they are visible, and we use CSS animate them.
Also, enami has a few other options that others libraries don't have but that i found very useful:

**Parent/Children system:** Allows you to trigger all the animations inside an element, this prevents problems when you use some animations with delay between them and they end up down on the scroll and getting triggered later.

**Staggering:** A simple way to stagger animations inside an element.

**This is a W.I.P, website with demos, documentation on methods and events coming soon.**

This library is mean to work as a simple way to animate elements on your site, if you intend to do some heavy animations you are maybe looking for libraries like [anime.js](https://github.com/juliangarnier/anime) or [gsap](https://github.com/greensock/GSAP)

you are welcome for my broken english btw, lol






## Basic usage
1. Include the script
```
<script src="http://test.example.com/enima.js"></script>
```
2. Add the **data-enami="my-animation"** attribute on the HTML element you want to animate
```
<h1 data-enami="fade-up">Hello world!</h1>
```
3. Init the script
```
var myEnami = new enami();
```

data attributes override parameters
all parameters are optional

## enami parameters
<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Type</th>
      <th>Default</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <!-- <tr>
      <td>element</td>
      <td><i>boolean</i></td>
      <td>0</td>
      <td>Index number of initial slide.</td>
    </tr> -->
    <tr>
      <td>selector</td>
      <td><i>string</i></td>
      <td>document</td>
      <td>The parent selector where this enami works.</td>
    </tr>
    <tr>
      <td>once</td>
      <td><i>boolean</i></td>
      <td>true</td>
      <td>Trigger animation once or every time its on viewport.</td>
    </tr>
    <tr>
      <td>delay</td>
      <td><i>string</i></td>
      <td>0</td>
      <td>Adds animation-delay/transition-delay to the element, use a CSS time values (.4s, 400ms)</td>
    </tr>
    <tr>
      <td>duration</td>
      <td><i>string</i></td>
      <td>400</td>
      <td>Adds animation-duration/transition-duration to the element, use a CSS time values (.4s, 400ms)</td>
    </tr>
    <tr>
      <td>disableOnMobile</td>
      <td><i>boolean</i></td>
      <td>false</td>
      <td>If detects mobile, all the animations will be on finish state.</td>
    </tr>
    <tr>
      <td>offset</td>
      <td><i>string</i></td>
      <td>"0px 0px 0px 0px"</td>
      <td>IntersectionObserver rootMargin wrapper.</td>
    </tr>
    <tr>
      <td>threshold</td>
      <td><i>integer</i></td>
      <td>0</td>
      <td>IntersectionObserver threshold wrapper.</td>
    </tr>
    
</table>