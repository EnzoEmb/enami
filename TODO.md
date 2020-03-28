* Library of animations
* Once ✅
* Offseting ✅
* Visibility percentage ✅ (threshold)
* Stagger ✅
* Events ✅
* Methods ✅
* disableOnMobile ✅
* Polyfills
* CSS Transform or Animations? ✅ both(?)

Bugs:
* stagger with 1s translates to 100ms ✅
* define offset only on global init config, make posible to init multiple enimas on different elements, if not defined init on global
* mehotd for reinit animation .reset('.test');
* method for update new elemetsn .update();
* method for isIntersection and all the others
* reset to initial animation on not visible resetAnimations
* check dinamic added content

Info:
* data-attributes should override init settings

Optimizaciones
* merge parent intersection observer with the basic one ()
* make boolean data-attributes get validated on present or not, not based on the value
