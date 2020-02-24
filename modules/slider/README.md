# Slider plugin

## Introduction
> Note: This project is regarded as portfolio background, so it's not ready for distribution (maybe, yet).

Welcome to the slider plugin github page. Although it looks like every other range slider, the component has several advantages, that make it unique.

The main one is a client-oriented approach. It has an API, that accepts variety of input data types (user decides what is convenient for him) and strict data types of output, which makes it predictable. And beyond that, application logic handles input contradictions and correct them in a predictable manner (implicitly, for now).

The second excellence is a presence of architecture, precisely MVC. More on that below.

And also, there are tests.

More to come.

## Getting started
In order to try the slider out, check [Demo Page](https://alanreidt.github.io/slider/).

### Mess with clone
For more, clone the repository:
```bash
# clone this repository
git clone https://github.com/alanreidt/slider.git
```

Use next npm commands to get corresponding results (all dependencies should be installed by npm automatically):
```bash
# to build and open web page with the slider
npm run dev

# to build and open web page with tests
npm run test

# to build production version
npm run build
```

The `slider API` is connected to the `test-page/app.js` file. You can mess around with it there.

Production version is placed in `prod` folder.

### Connect Slider to your project
Connect it to your code by downloading zip-file via green button at the top of the page “Clone or download”.

Unzip and place folder within your project folder.

And then, enter next lines in your main html file (or check `test-page` folder to see how to connect it directly to js and css files):
```html
<!-- import slider style (change yourpath) -->
<link rel="stylesheet" href="{your_path}/slider/prod/slider.min.css">

<!-- import slider API unit (change yourpath) -->
<script src="{your_path}/slider/prod/slider.min.js"></script>
```

And by next command initialize slider:
```javascript
// select your DOM element
const parent = document.querySelector(".slider-wrapper");

// and create slider with options
slider.create(parent, {
  boundaries: [0, 100],
  values: [20, 80],
  step: 20,
  hasTooltips: true,
});
```

Possible options are described in [the options section](#options).

By the way, don't forget to set `height` for vertical slider on `parent` element (because slider is created inside):
```css
/* parent element for the slider */
.slider-wrapper {
  /* the ruleset will allow slider to be responsive */
  height: 100%;
  max-height: 300px;
}
```

The slider will take all free space up — it has `width` or `height` equal to `100%`, depending on orientation.

## Documentation

### API
*slider object*, which localized in the `slider.js` file is dedicated as *Slider API Unit*.

Use its methods to interact with the slider entity.

#### create method
Compose from js docs.
#### getOptions method
Compose from js docs.
#### setOptions method
> Note: `orientation` and `hasTooltips` options are closed for this method.
>
> See details in [the options section](#options).

Compose from js docs.
#### setValueAt method
Compose from js docs.

### Options
`Options` represents an object with the next possible members:

| options | default value | Input type | Output type | Details |
|:-----------:|:---------------------:|:--------------------------:|:--------------------------:|---------------------------|
| boundaries | [0, 100] | number or number[]* | number[] | Min/Max value |
| values | average of boundaries | number or number[]* | number[] | Initial values = handles |
| step | 1 | number* | number | Step between values |
| orientation | "horizontal" | "horizontal" or "vertical" | "horizontal" or "vertical" | Orientation of the slider |
| hasTooltips | false | boolean | boolean | Tooltips state |

*\* any, that can be parseFloat(), as a number (e.g. `"100"`, `"100ab"`)*

For future info, see below.

#### boundaries
##### Input/Output type details
In case, when only a number is passed, the closest edge (`Min` or `Max` value) to the input will be changed.

For example, having an `200`, as an *input*, during an *initialization* (default value is `[0, 100]`), will result in `[0, 200]`.

Analogical situation would have a place during a *reassignment* (using *API setOptions method*) — your closest boundaries value will be changed.

*Output* will always return an array of numbers (even if only single value was passed). And that array will be sorted in ascending order.

*restrictions*: only positive and negative numbers are allowed.

##### Auto correction
This option represents something like an axiom — all other dependent values are corrected according to it.

#### values
##### Input/Output type details
`values` option is handled identically to `boundaries`, but, as it has more values to deal with, there is additional information you need to know.

*The first* difference is if input value lie in the middle of 2 current values, then the bigger will be changed.

And *the second* is that you can pass an array up to current values length (excessed will be ignored) — it will change all the closest values to the inputted ones.

*restrictions*: only positive and negative numbers are allowed.

##### Auto correction
This value is always corrected to accordance with `step` option. If it doesn't correspond — the closest divisible by the `step` will be assigned.

#### step
##### Input/Output type details
*restrictions*: value from `1` to `Range (Max − Min values)` (`1 <= value <= Range`) is allowed.

##### Auto correction
The value is always corrected to accordance with `boundaries` option. The division of `boundaries` difference by `step` should have no remainder, otherwise it will be assigned to the closest possible one.

#### orientation
##### API setOptions
`orientation` option is closed for an *update*, as this operation requires repaint of a web-page.

You can accomplish desired result by using *API create method*, instead.

#### hasTooltips
##### API setOptions
Analogically to `orientation` option `hasTooltips` option is closed for an *update*.

Although, it's possible to realize an *update* behavior here, I don't see this, as a logical functionality (see below).

You can accomplish desired result by using *API create method*, instead.

Or you can create the slider with tooltips and then hide them through css, when desire.

> P.S. Functionality will be enhanced in the future, in order to allow to listen to events (such as an *update*), which will improve the situation.


### Architecture
The slider architecture follows an *original MVC architecture*, the topic is thoroughly described in the article [«Охота на мифический MVC»](https://habr.com/ru/post/321050/) (see some details below).

#### Model
The module contains business logic of the slider component: possible slider options and logic around them.

#### ViewController
This module is responsible for display of current slider state and handling of user actions.

It translates position of occurred events into the slider `values` option. All further work (as validation of that value and correction of correlated options) is handled by `Model`.

As you see, `ViewController` performs View and Controller functionality. The objective for this is that it's not logical, from functional decomposition standpoint, to divide the module — handles (which realize Controller functionality) don't have any value outside of the slider (View).

#### UML diagram
This is a bird's view on the slider architecture.

Diagram represents only public members.

![Slider Architecture UML diagram](./_miscellaneous/slider_uml_diagram.jpeg)
