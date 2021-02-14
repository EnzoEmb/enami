
<p align="center">
  <img alt="enami" src="https://i.imgur.com/eghT0eF.png">
</p>

<p align="center">
<b>[W.I.P]</b>
<b>enami</b> is an animation-on-scroll library, similar to libraries like <a href="https://github.com/michalsnik/aos">aos</a> or <a href="https://github.com/matthieua/WOW">wow.js</a> but with a few differences.
</p>

This library uses [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), to check the visibility of the element, allowing to trigger animations on horizontal scrolls, when using a smooth-scroll library or inside a slider/carousel.



### Basic functioning
This library adds **data-enami-in** attribute when an element is on viewport, and **data-enami-out** when the element is out. 


### Features

**Parent triggering:** You can specify a parent element, so you can trigger all the animated elements inside it.

**Staggering:** Adds a delay between all the children animations to make a domino effect.



## Basic usage
1. Include script and css
``` html
<script src="https://unpkg.com/enami@latest/dist/enami.min.js"></script>
<link href="https://unpkg.com/enami@latest/dist/enami.min.css" rel="stylesheet">
```
2. Add your animation attribute **data-enami="fade-up"** on the HTML element you want to animate
``` html
<h1 data-enami="fade-up">Hello world!</h1>
```
3. Init the script
``` javascript
var myEnami = new enami();
```
<!-- 4. (optional) Add this css if you want the animations to begin in a hidden state
``` css
[data-enami]{
  visibility: hidden
}
``` -->

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
    <tr>
      <td>root</td>
      <td><i>DOM Element</i></td>
      <td>null</td>
      <td>--</td>
      <td>IntersectionObserver root.</td>
    </tr>
    <tr>
      <td>animation</td>
      <td><i>animation name</i></td>
      <td>--</td>
      <td>[data-enami-animation]</td>
      <td>Animation that gets applied to every children</td>
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

#### Usage
``` javascript

myEnami = document.getElementById('myElement')

myEnami.addEventListener('enami:animate-out', function (e) {
    alert('Hello World')
});

```

#### List

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
      <code>enami:animate-in</code>
      </td>
      <td>When the element is in of the viewport</td>
    </tr>
    <tr>
      <td>
      <code>enami:animate-out</code>
      </td>
      <td>When the element is out of the viewport</td>
    </tr>
    <tr>
      <td>
      <code>enami:destroy</code>
      </td>
      <td>When the destroy method is called</td>
    </tr>
    <tr>
      <td>
      <code>enami:update</code>
      </td>
      <td>When the update method is called</td>
    </tr>
    <tr>
      <td>
      <code>enami:init</code>
      </td>
      <td>When the init method is called</td>
    </tr>
    </tbody>
</table>


## Custom animation CSS
```css
[data-enami="my-animation"][data-enami-in] {
    animation: 2s fadeUp forwards cubic-bezier(0.19, 1, 0.22, 1);
    @keyframes myAnimation {
        from {
            transform: translate3d(0, 40px, 0) rotate(0.02deg);
            opacity: 0;
        }
        to {
            transform: translate3d(0, 0, 0) rotate(0deg);
            opacity: 1;
        }
    }
}
```

## Note:
 This library is meant to work as a simple way to animate elements on your site, if you intend to do some heavy animations you are probably looking for libraries like [anime.js](https://github.com/juliangarnier/anime) or [gsap](https://github.com/greensock/GSAP)
