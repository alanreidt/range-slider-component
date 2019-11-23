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
<code>
  // import slider style (change yourpath)
  <link rel="stylesheet" href="yourpath/slider_plugin/src/slider.scss">
  // import slider API unit (change yourpath)
  <script src="yourpath/slider_plugin/src/slider.js"></script>
</code>
<code lang="javascript">
  // or import slider API directly into your javascript
  import {slider} from "../src/slider.js";
</code>

And by next command initialize slider:
<code lang="javascript">
  // select your DOM element
  const $parent = document.querySelector(".slider-wrapper");

  // and create slider with options
  slider.create($parent, {
    boundaries: [0, 100],
    values: [20, 80],
    step: 20,
    hasTooltips: true,
  });
</code>

Possible options are described in the [according section]().

By the way, don't forget to set height for vertical slider on $parent element (cause slider is created inside):
<code>
  // $parent element for the slider
  .slider-wrapper {
    height: 100%;
    max-height: 300px;
  }
</code>
