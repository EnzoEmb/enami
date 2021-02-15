
<p align="center">
  <img alt="enami" src="https://i.imgur.com/eghT0eF.png">
</p>

<p align="center">
<b>enami</b> is an animation-on-scroll library, similar to libraries like <a href="https://github.com/michalsnik/aos">aos</a> or <a href="https://github.com/matthieua/WOW">wow.js</a> but with a few differences.
</p>

This library uses [IntersectionObserver API](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), to check the visibility of the element, allowing to trigger css animations on horizontal scrolls, when using a smooth-scroll library or inside a slider/carousel.


<br />
<br />

### Features

**Parent triggering:** You can specify a parent element, so you can trigger all the animated elements inside it.

**Staggering:** Adds a delay between all the children animations to make a domino effect.




<br />
<br />

## Basic usage
1. Include script and css
``` html
<script src="https://unpkg.com/enami@0.8.0/dist/enami.min.js"></script>
<link rel="stylesheet" href="https://unpkg.com/enami@0.8.0/dist/enami.min.css">
```
2. Add your animation attribute **data-enami="fade-up"** on the HTML element you want to animate
``` html
<h1 data-enami="fade-up">Hello world!</h1>
```
3. Init the script
``` javascript
var myEnami = new enami();
```


<br />
<br />

## Settings

``` javascript
var myEnami = new enami({
  selector: null, // parent element containing your animations, if null document will be used (useful when having multiple instances), usage: '#myElement'
  delay: null, // set delay to all animations, usage: '1s'
  duration: null, // set duration to all animations, usage: '1s'
  once: true, // if repeat the animations every time they appear on viewport or just once
  disableOnMobile: false, // if detect mobile, every animation will be on final state
  offset: '0px 0px 0px 0px', // intersection observer rootMargin, useful for offseting the viewport functioning
  threshold: 0, // intersection observer thershold property
  root: null, // intersection observer root to be used a viewport
  reset: false // i have no idea
})
```


<br />
<br />

## Data attributes

``` javascript
// Single element usage:
data-enami="fade-up" // define the animation to be applied to this element
data-enami-delay=".2s" // define the delay to be apllied to this element (css time format)
data-enami-duration=".2s" // define the delay to be apllied to this element (css time format)
data-enami-once // unused feature
data-enami-reset // unused feature

// Multiple elements usage:
data-enami-children=".my-box" // define the children animations of this parent
data-enami-animation="fade-up" // define the animation to be applied to all the childrens
data-enami-stagger=".2s" // define the staggering time to be apllied to all the childrens

```

<br />
<br />


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
        <code>myEnami.destroy(state)</code>
      </td>
      <td>Disconnect all observers. State can be null, 'initial' or 'final' depending on the final state you want your animations to be when destroyed</td>
    </tr>
    </tbody>
</table>


<br />
<br />

## Events
``` javascript
var myEnamiElement = document.getElementById('myElement')

// When the element is on viewport
myEnamiElement.addEventListener('enami:animate-in', function (e) {
  console.log('Element in viewport')
});

// When the element is out viewport
myEnamiElement.addEventListener('enami:animate-out', function (e) {
  console.log('Element out of viewport')
});

// When an instance is destroy
document.addEventListener('enami:destroy', function (e) {
  console.log('An enami has been destroyed')
  console.log('Selector:', e.detail.target)
});

// When an new instance is initiated
document.addEventListener('enami:init', function (e) {
  console.log('An enami has been initialized')
  console.log('Selector:', e.detail.target)
});

```


<br />
<br />

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


<br />
<br />

## Note:
 This library is meant to work as a simple way to animate elements on your site, if you intend to do some heavy animations you are probably looking for libraries like [anime.js](https://github.com/juliangarnier/anime) or [gsap](https://github.com/greensock/GSAP)
