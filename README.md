# Slider plugin

## Desctiption
Welcome on the slider plugin github page. This project is dedicated as portfolio background, so it's not ready for distribution (yet, maybe). But the slider plugin already has several advantages, that make it unique.
The main slider plugin advantage is a client-oriented approach. It has an API, that accepts variety of input data types (user decide what is convenient for him) and strict data types of output, which makes it predictable. And beyond that, application logic handles input contradictions and correct them (implicitly, for now).
The second excellence is a presence of architecture, precisely MVC. More on that below.
And also, there are tests.
More to come.

## Getting started
In order to try the slider out, you can use Demo Page Playground section.
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

Possible options are described in the [according section]().

By the way, don't forget to set height for vertical slider on $parent element (because slider is created inside):
```css
/* parent element for the slider */
.slider-wrapper {
  height: 100%;
  max-height: 300px;
}
```

The slider will take all free space — it has width or height equal to 100%, depending on orientation.

## Documentation

### API
slider object, which localized in the slider.js file is dedicated as Slider API Unit.
Use its create, getOptions or setOptions methods to interact with the slider entity.

#### create method
Compose from js docs.
#### getOptions method
Compose from js docs.
#### setOptions method
Compose from js docs.

### Options
| options | default value | Input type | Output type | Details |
|:-----------:|:---------------------:|:--------------------------:|:--------------------------:|---------------------------|
| boundaries | [0, 100] | number or number[]* | number[] | Min/Max value |
| values | average of boundaries | number or number[]* | number[] | Initial values = handles |
| step | 1 | number* | number | Step between values |
| orientation | "horizontal" | "horizontal" or "vertical" | "horizontal" or "vertical" | Orientation of the slider |
| hasTooltips | false | boolean | boolean | Tooltips state |
*\* any, that can be parseFloat(), as a number (e.g. "100", "100ab")*

#### boundaries
##### Input/Output type details
<p>In case, when only a number is passed, the closest edge (min or max value) to the input will be changed.</p>
<p>
For example, having an <code>200</code>, as an input, during an initialization (default value is [0, 100]), will result in [0, 200].
<br>
Analogycal situation would have a place during a reassignment (using API setOptions method) — your closest boundaries value will be changed.
</p>
<p>Output will always return an array of numbers (even if only single value was passed). And that array will be sorted in ascending order.</p>

<p>**restrictions**: only positive and negative numbers are allowed.</p>

#### values
##### Input/Output type details
<p><code>values</code> option is handled indentically to <code>boudaries</code>, but, as it has more values to deal with, there has to be additional explanation:</p>

<p>The first difference is if input value lie in the middle of 2 current values, then the bigger will be changed.</p>

<p>And the second is that you can pass array up to current values length (excessed will be ignored) — it will change all the closest values to the inputed one.</p>

<p>**restrictions**: only positive and negative numbers are allowed.</p>

#### step
##### Input/Output type details
<p>**restrictions**: value from 1 to Max boundaries value (1 <= value <= Max) is allowed.</p>
