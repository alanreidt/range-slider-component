# Slider plugin

## Introduction
Note: This project is dedicated as portfolio background, so it's not ready for distribution (maybe, yet).

Welcome to the slider plugin github page. Although it looks like every other range slider, the component has several advantages, that make it unique.

The main slider plugin advantage is a client-oriented approach. It has an API, that accepts variety of input data types (user decide what is convenient for him) and strict data types of output, which makes it predictable. And beyond that, application logic handles input contradictions and correct them in a predictable manner (implicitly, for now).

The second excellence is a presence of architecture, precisely MVC. More on that below.

And also, there are tests.

More to come.

## Getting started
In order to try the slider out, you can use [Demo Page Playground section](#change-me).

For more, use git clone command and modify Demo Page app.js file by yourself.

Or, connect it to your code (which isn't recomended for now) by entering next lines in your main html file:
```html
<!-- import slider style (change yourpath) -->
<link rel="stylesheet" href="yourpath/slider_plugin/src/slider.scss">
<!-- import slider API unit (change yourpath) -->
<script src="yourpath/slider_plugin/src/slider.js"></script>
```
```javascript
// or import slider API directly into your javascript
import {slider} from "../src/slider.js";
```

And by next command initialize slider:
```javascript
// select your DOM element
const $parent = document.querySelector(".slider-wrapper");

// and create slider with options
slider.create($parent, {
  boundaries: [0, 100],
  values: [20, 80],
  step: 20,
  hasTooltips: true,
});
```

Possible options are described in the [according section](#options).

By the way, don't forget to set height for vertical slider on $parent element (because slider is created inside):
```css
/* parent element for the slider */
.slider-wrapper {
  /* the ruleset'll allow slider to be responsive */
  height: 100%;
  max-height: 300px;
}
```

The slider will take all free space up — it has width or height equal to 100%, depending on orientation.

## Documentation

### API
*slider object*, which localized in the slider.js file is dedicated as Slider API Unit.

Use its create, getOptions or setOptions methods to interact with the slider entity.

#### create method
Compose from js docs.
#### getOptions method
Compose from js docs.
#### setOptions method
Compose from js docs.

### Options
Options represents an object with the next possible members:

| options | default value | Input type | Output type | Details |
|:-----------:|:---------------------:|:--------------------------:|:--------------------------:|---------------------------|
| boundaries | [0, 100] | number or number[]* | number[] | Min/Max value |
| values | average of boundaries | number or number[]* | number[] | Initial values = handles |
| step | 1 | number* | number | Step between values |
| orientation | "horizontal" | "horizontal" or "vertical" | "horizontal" or "vertical" | Orientation of the slider |
| hasTooltips | false | boolean | boolean | Tooltips state |

*\* any, that can be parseFloat(), as a number (e.g. "100", "100ab")*

For future info, see below.

#### boundaries
##### Input/Output type details
In case, when only a number is passed, the closest edge (min or max value) to the input will be changed.

For example, having an `200`, as an **input**, during an initialization (default value is `[0, 100]`), will result in `[0, 200]`.

Analogycal situation would have a place during a reassignment (using API setOptions method) — your closest boundaries value will be changed.

**Output** will always return an array of numbers (even if only single value was passed). And that array will be sorted in ascending order.

**restrictions**: only positive and negative numbers are allowed.

##### Auto correction
This option represents something like an axiom — all other dependent values are corrected according to it.

#### values
##### Input/Output type details
`values` option is handled indentically to `boundaries`, but, as it has more values to deal with, there is additional information you need to know.

The first difference is if input value lie in the middle of 2 current values, then the bigger will be changed.

And the second is that you can pass an array up to current values length (excessed will be ignored) — it will change all the closest values to the inputed ones.

*restrictions*: only positive and negative numbers are allowed.

##### Auto correction
This value is always corrected to accordance with `step` option. If it doesn't correspond — the closest divisible by the `step` will be assigned.

#### step
##### Input/Output type details
<p>**restrictions**: value from 1 to Max (1 <= value <= Max) is allowed.</p>

##### Auto correction
<p>The value is always corrected to accordance to <code>boundaries</code> option. The division of boundaries difference by step should have no remainder, else it will be assigned to the closest possible one.</p>

#### orientation
##### API setOptions
<p>
<code>orientation</code> option is closed for update, as this operation requires repaint of a web-page.
<br>
You can accomplish desired result by using API create method, instead.
</p>

#### hasTooltips
##### API setOptions
<p>
Analogycally to <code>orientation</code> option <code>hasTooltips</code> option is closed for update.
<br>
Although, it's possible to realize update behavior there, but I don't see this as a logical functionality.
<br>
</p>
<p>
You can accomplish desired result by using API create method, instead.
<br>
Or you can create the slider with tooltips and then hide them through css, when desire.
<br>
P.S. Functionality will be enhanced in the future, in order to allow to listen to events (as update), which will improve the situation.
</p>


### Architecture
<p>The slider architecture follows a standart MVC architecture, as described in the article [«Охота на мифический MVC»](https://habr.com/ru/post/321050/).</p>

<p>Unfortunatelly, there no English translation of the article, but, in a few words, a standart MVC architecture is characterized by a presence of Model, which plays the role of <i>the facade</i> to an application Domain Model.</p>

<p>Note: although, the slider is just a component of an application and it don't have a Domain Model, I decided to organaze Facade anyway. The reason for that see in [the sliderAdapter section.](###sliderAdapter).</p>

<p>In the result, the approach gives an opportunity to swap modules around and modify them without the need of breaking changes of the code.</p>

### sliderModel
<p>The module contains business logic of the component: possible slider options and logic around them.</p>

### sliderAdapter
<p>Adapter module is used, as a wrapper around <code>sliderModel</code>. It localizes calls to the Model, allowing to have all dependent code in one place.</p>

<p>Though, presence of Adapter is optional, it gives a way to freely modify <code>sliderModel</code> and even replace it altogether, if current business logic solution don't satisfy your requirements.</p>

### sliderUI
<p>This module is responsible for display of current slider state and handling of user actions. It only translates position of occured events into the slider value. All futher work (as validation of that value and correction of correlated options) is handled by sliderModel.</p>

<p>As you see, sliderUI performs View and Controller functionality. The objective for this is that it's not logical to divide this modules from functional decomposition standpoint in this concrete component — handle don't have any value outside of the slider.</p>
