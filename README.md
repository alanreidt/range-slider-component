# range-slider-component
Realization of a range-slider component, which is used to display a value between range of values or just a single one, giving a user-friendly interface.

[Demo page](https://alanreidt.github.io/range-slider-component/)

The project had a lot of challenges along the way. I've learned quite a bit about MVC architecture and application design principles in general — now all of that gives me understanding of what can cause troubles later on, when I build something. Also, it's taught me about the importance of automated unit tests, which has helped me to detect bugs during the refactoring and addition of new features phases. And, of course, many more.

Initially was realized as a part of the [Full-stack development education system](https://www.fullstack-development.com/en#system).

## Aimed skills:
- Object-oriented programming principles,
- MVC architecture,
- Functional programming approach,
- Documentation,
- Component API creation,
- TDD approach,
- UML diagram,
- Airbnb style guide.

## Requirements:
- [requirements in Russian](https://rizzoma.com/topic/d5c429337bcaa70548fb5aeedee6d92b/0_b_8ndo_78h7o/),
- [requirements in English](./_miscellaneous/requirements.md).

## Non-standard dependencies
- [plop](https://github.com/plopjs/plop),
- [riteway](https://github.com/ericelliott/riteway),
- [esm](https://github.com/standard-things/esm),
- [@bem-react/classname](https://github.com/bem/bem-react/tree/master/packages/classname),
- [deep-equal](https://github.com/inspect-js/node-deep-equal).

## Getting started
In order to try Slider out, check [Demo Page](https://alanreidt.github.io/slider/).

### Mess with clone
For more, clone the repository:
```bash
# clone this repository
git clone https://github.com/alanreidt/slider.git
```

Use next npm commands to get corresponding results (all dependencies should be installed by npm automatically):
```bash
# to build and open web page with Slider
npm run dev

# to build and open web page with tests
npm run test

# to build production version
npm run build
```

`Slider API` is connected to the `test-page/app.js` file. You can mess around with it there.

Production version is placed in `prod` folder.

### Connect Slider to your project
Connect it to your code by downloading zip-file via green button at the top of the page “Clone or download”.

Unzip and place folder within your project folder.

And then, enter next lines in your main html file (or check `test-page` folder to see how to connect it directly to js and css files):
```html
<!-- import Slider style (change yourpath) -->
<link rel="stylesheet" href="{your_path}/slider/prod/slider.min.css">

<!-- import Slider API unit (change yourpath) -->
<script src="{your_path}/slider/prod/Slider.min.js"></script>
```

And by next command initialize Slider:
```javascript
// select your DOM element
const parent = document.querySelector(".slider-wrapper");

// and create Slider with options
Slider.create(parent, {
  boundaries: [0, 100],
  values: [20, 80],
  step: 20,
  hasTooltips: true,
});
```

Possible options are described in [the options section](#options).

By the way, don't forget to set `height` for vertical Slider on `parent` element (because Slider is created inside):
```css
/* parent element for Slider */
.slider-wrapper {
  /* the ruleset will allow Slider to be responsive */
  height: 100%;
  max-height: 300px;
}
```

Slider will take all free space up — it has `width` or `height` equal to `100%`, depending on orientation.

## Documentation

### API
*Slider object*, which localized in the `src/Slider.js` file is dedicated as *Slider API Unit*.

Use its methods to interact with Slider entity.

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
#### addSubscriber method
> Note: currently only `'update'` event is realized.

Compose from js docs.
#### removeSubscriber method
Compose from js docs.
#### triggerSubscribers method
Compose from js docs.

### Options
`Options` represents an object with the next possible members:

| options | default value | Input type | Output type | Details |
|:-----------:|:---------------------:|:--------------------------:|:--------------------------:|---------------------------|
| boundaries | [0, 100] | number or number[]* | number[] | Min/Max value |
| values | average of boundaries | number or number[]* | number[] | Initial values = handles |
| step | 1 | number* | number | Step between values |
| orientation | "horizontal" | "horizontal" or "vertical" | "horizontal" or "vertical" | Orientation of Slider |
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

*The first* difference is if input value lies in the middle of 2 current values, then the bigger one will be changed.

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

You can accomplish desired result by using *API create method* along with `'update'` event, instead.

#### hasTooltips
##### API setOptions
Analogically to `orientation` option `hasTooltips` option is closed for an *update*.

Although, it's possible to realize an *update* behavior here, I don't see this, as a logical functionality (see below).

You can accomplish desired result by using *API create method* along with `'update'` event, instead.

Or you can create Slider with tooltips and then hide them through css, depending on event.

### Architecture
Slider architecture follows an *original MVC architecture*, the topic is thoroughly described in the article [«Охота на мифический MVC»](https://habr.com/ru/post/321050/) (see some details below).

Slider, in the essence, represents component, which reflects a part of Application's Domain Model and allows user to change a representation of the part (via modification of Slider inner Model).

For example, on a hotel website, Slider will reflect the hotel rooms price range (which will be passed to the Slider Model `boundaries` option) and will allow user to narrow down a representation of the diapason to its needs.

But, Slider also can manipulate Domain Model directly (through the Application Model (Façade), of course). In that case, Slider options will be synchronized on an `'update'` event.

So, Slider architecture is built with these things in mind.

#### Model
The module contains business logic of Slider component: possible Slider options and logic around them.

#### ViewController
This module is responsible for display of current Slider state and handling of user actions.

It translates position of occurred events into Slider `values` option. All further work (as validation of that value and correction of correlated options) is handled by `Model`.

As you see, `ViewController` performs View and Controller functionality. The objective for this is that it's not logical, from functional decomposition standpoint, to divide the module — handles (which realize Controller functionality) don't have any value outside of Slider (View).

#### UML diagram
This is a bird's view on Slider architecture.

Diagram represents only public members.

![Slider Architecture UML diagram](./_miscellaneous/slider_uml_diagram.jpeg)
