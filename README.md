
<p align="center">
  <img alt="enami" src="https://i.imgur.com/eghT0eF.png">
</p>

**enami** is a animation-on-scroll library, similar to libraries like [aos](https://github.com/michalsnik/aos) or [wow.js](https://github.com/matthieua/WOW) but with a few differences.


This library uses [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), to check the visibility of the element, this allows you to trigger animations on horizontal scrolls, when using a smooth-scroll library or inside a slider/carousel.



### How it works
This library adds **data-enami-in** attribute when an element is on viewport, and **data-enami-out** when the element is out. 


### Features

**Parent triggering:** You can specify a parent element, so you can trigger all the animated elements inside it.

**Staggering:** Adds a delay between all the children animations to make a domino effect.



## Basic usage
1. Include the script
``` html
<script src="http://test.example.com/enami.js"></script>
```
2. Add your animation attribute **data-enami="my-animation"** on the HTML element you want to animate
``` html
<h1 data-enami="fade-up">Hello world!</h1>
```
3. Init the script
``` javascript
var myEnami = new enami();
```


## Notes
- Data attributes override options
- All parameters are optional


## Options
<table>
  <thead>
    <tr>
      <th>Parameter</th>
      <th>Type</th>
      <th>Default</th>
      <th>Data Attribute</th>
      <th>Description</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>selector</td>
      <td><i>string</i></td>
      <td>document</td>
      <td>--</td>
      <td>The parent selector where this enami works.</td>
    </tr>
    <tr>
      <td>once</td>
      <td><i>boolean</i></td>
      <td>true</td>
      <td>data-enami-once</td>
      <td>Trigger animation once or every time its on viewport.</td>
    </tr>
    <tr>
      <td>delay</td>
      <td><i>string</i></td>
      <td>0</td>
      <td>data-enami-delay</td>
      <td>Adds animation-delay/transition-delay to the element, use a CSS time values (.4s, 400ms)</td>
    </tr>
    <tr>
      <td>duration</td>
      <td><i>string</i></td>
      <td>400</td>
      <td>data-enami-duration</td>
      <td>Adds animation-duration/transition-duration to the element, use a CSS time values (.4s, 400ms)</td>
    </tr>
    <tr>
      <td>reset</td>
      <td><i>string</i></td>
      <td>true</td>
      <td>data-enami-reset</td>
      <td>When the element is out of the viewport the enami gets resets to the its initial state.</td>
    </tr>
    <tr>
      <td>disableOnMobile</td>
      <td><i>boolean</i></td>
      <td>false</td>
      <td>--</td>
      <td>If detects mobile, all the animations will be on finish state.</td>
    </tr>
    <tr>
      <td>offset</td>
      <td><i>string</i></td>
      <td>"0px 0px 0px 0px"</td>
      <td>--</td>
      <td>IntersectionObserver rootMargin wrapper.</td>
    </tr>
    <tr>
      <td>threshold</td>
      <td><i>integer</i></td>
      <td>0</td>
      <td>--</td>
      <td>IntersectionObserver threshold wrapper.</td>
    </tr>
    
</table>




## Methods

<table>
  <thead>
    <tr>
      <th>Method</th>
      <th>What it does</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
      <code>myEnami.destroy(myElement)</code>
      </td>
      <td>Disconnect all observers, if parameter is present, also triggers reset on the element</td>
    </tr>
    <tr>
      <td>
      <code>myEnami.init()</code>
      </td>
      <td>Setup all observers</td>
    </tr>
    <tr>
      <td>
      <code>myEnami.reset(myElement)</code>
      </td>
      <td>Reset element enami to initial state</td>
    </tr>
    <tr>
      <td>
      <code>myEnami.update()</code>
      </td>
      <td>Disconnect and setup again all observers</td>
    </tr>
    </tbody>
</table>


## Events

<table>
  <thead>
    <tr>
      <th>Event</th>
      <th>When is executed</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
      <code>myEnami.destroy()</code>
      </td>
      <td>Disconnect all observers</td>
    </tr>
    <tr>
      <td>
      <code>myEnami.init()</code>
      </td>
      <td>Setup all observers</td>
    </tr>
    <tr>
      <td>
      <code>myEnami.reset(myElement)</code>
      </td>
      <td>Reset element enami to initial state</td>
    </tr>
    <tr>
      <td>
      <code>myEnami.update()</code>
      </td>
      <td>Disconnect and setup again all observers</td>
    </tr>
    </tbody>
</table>




**Note:** This library is meant to work as a simple way to animate elements on your site, if you intend to do some heavy animations you are probably looking for libraries like [anime.js](https://github.com/juliangarnier/anime) or [gsap](https://github.com/greensock/GSAP)