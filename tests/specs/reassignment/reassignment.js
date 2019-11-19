import {testClass} from "../../testUtilities";
import {Slider} from "../../../src/Slider";


export function reassignment() {
  const Class = Slider;
  const method = "setValues";
  const methodGetter = "getValues";

  const runTest = testClass({Class, method, methodGetter});

  describe("shall change values, if correct one is passed", function() {
    let options = [{
      boundaries: [100, 500],
      values: 180,
      step: 20,
    }];
    let expectations = [{
      ...options[0],
      values: [180]
    }];
    let testOptions = {options, expectations};

    runTest(testOptions);
  });


  describe("shall not change values, if incorrect one is passed", function() {
    let options = [{
      boundaries: [true, false],
      values: false,
      step: "two",
    }];
    let expectations = [{
      boundaries: [0, 100],
      values: [50],
      step: 1,
      orientation: "horizontal",
      hasTooltips: false,
    }];
    let testOptions = {options, expectations};

    runTest(testOptions);
  });


  describe("shall correct values", function() {

    context(`shall correct {value},
    if passed value isn't correspond to {step}`, function() {
      let options = [
        {boundaries: [0, 500], step: 100, values: 190},
        {boundaries: [-500, 500], step: 250, values: -100},
        {boundaries: [-1000, -500], step: 50, values: -525},
      ];
      let expectations = [
        { values: [200] },
        { values: [0] },
        { values: [-500] },
      ];
      let testOptions = {options, expectations};

      runTest(testOptions);
    });

    context(`shall correct {value},
    if passed value is out of {boundaries}`, function() {
      let options = [
        {boundaries: [0, 500], values: 1000},
        {boundaries: [-500, 500], values: -1000},
        {boundaries: [-500, 500], values: [-1000, 1000]},
        {boundaries: [-500, 500], values: [-1000, 250, 1000]},
        {boundaries: [-500, 500], values: [-2000, -1000, 250, 1000, 2000]},
        {boundaries: [-500, 500], values: [250, -2000, 1000, 2000, -1000]},
      ];
      let expectations = [
        { boundaries: [0, 500], values: [500] },
        { boundaries: [-500, 500], values: [-500] },
        { boundaries: [-500, 500], values: [-500, 500] },
        { boundaries: [-500, 500], values: [-500, 250, 500] },
        { boundaries: [-500, 500], values: [-500, 250, 500] },
        { boundaries: [-500, 500], values: [-500, 250, 500] },
      ];
      let testOptions = {options, expectations};

      runTest(testOptions);
    });

    context(`shall correct {step},
    if passed value isn't correspond to {boundaries(range)}`, function() {
      let options = [
        {boundaries: [0, 100], step: 15},
        {boundaries: [0, 300], step: 250},
        {boundaries: [-500, 500], step: 105},
      ];
      let expectations = [
        {boundaries: [0, 100], step: 20},
        {boundaries: [0, 300], step: 300},
        {boundaries: [-500, 500], step: 100},
      ];
      let testOptions = {options, expectations};

      runTest(testOptions);
    });

    context(`shall correct {step},
    if passed value is bigger than difference of {boundaries(range)}`, function() {
      let options = [
        {step: 200},
        {boundaries: [300, 900], step: 1000},
        {boundaries: [-500, 500], step: 2000},
      ];
      let expectations = [
        {step: 100},
        {boundaries: [300, 900], step: 600},
        {boundaries: [-500, 500], step: 1000},
      ];
      let testOptions = {options, expectations};

      runTest(testOptions);
    });

    context(`{boundaries} on change, shall correct {value},
    if it became out of the range`, function() {
      let options = [
        { boundaries: [200, 500] },
        { boundaries: [-500, -200] },
      ];
      let expectations = [
        { boundaries: [200, 500], values: [200] },
        { boundaries: [-500, -200], values: [-200] },
      ];
      let ClassOptions = {
        values: 100,
      };
      let testOptions = {ClassOptions, options, expectations};

      runTest(testOptions);
    });

    context(`{boundaries} on change, shall correct {step},
    if it stopped to correspond to the range`, function() {
      let options = [
        { boundaries: [0, 90] },
        { boundaries: [-50, 0] },
      ];
      let expectations = [
        {boundaries: [0, 90], step: 18},
        {boundaries: [-50, 0], step: 25},
      ];
      let ClassOptions = {
        step: 20,
      };
      let testOptions = {ClassOptions, options, expectations};

      runTest(testOptions);
    });

    context(`{boundaries} on change shall correct {step}, if it became bigger,
    than difference of {boundaries(range)}`, function() {
      let options = [
        { boundaries: [0, 90] },
        { boundaries: [-50, 0] },
      ];
      let expectations = [
        {boundaries: [0, 90], step: 90},
        {boundaries: [-50, 0], step: 50},
      ];
      let ClassOptions = {
        step: 100,
      };
      let testOptions = {ClassOptions, options, expectations};

      runTest(testOptions);
    });

    context(`{step} on change, shall correct {value},
    if it stopped to correspond to its value`, function() {
      let options = [
        { step: 20 },
        { step: 50 },
      ];
      let expectations = [
        { step: 20, values: [80] },
        { step: 50, values: [50] },
      ];
      let ClassOptions = {
        values: 70,
      };
      let testOptions = {ClassOptions, options, expectations};

      runTest(testOptions);
    });

  });


  describe("shall restrict values after initialization", function() {

    describe("restrict {values} quantity (length) after initialization", function() {
      context("restrict default {values} quantity (length)", function() {
        const options = [
          { values: 30 },
          { values: [50, 90] },
          { values: [60, 70, 90] },
        ];
        const expectations = [
          { values: [30] },
          { values: [50] },
          { values: [60] },
        ];
        const testOptions = {options, expectations};

        runTest(testOptions);
      });

      describe("restrict changed {values} quantity (length)", function() {
        context("preserve single value", function() {
          const ClassOptions = {
            values: 20,
          };
          const options = [
            { values: 30 },
            { values: [50, 90] },
            { values: [60, 70, 90] },
          ];
          const expectations = [
            { values: [30] },
            { values: [50] },
            { values: [60] },
          ];
          const testOptions = {ClassOptions, options, expectations};

          runTest(testOptions);
        });

        context("preserve 2 values", function() {
          const ClassOptions = {
            values: [20, 80],
          };
          const options = [
            { values: 30 },
            { values: [30, 90] },
            { values: [30, 50, 90] },
          ];
          const expectations = [
            { values: [30, 80] },
            { values: [30, 90] },
            { values: [30, 50] },
          ];
          const testOptions = {ClassOptions, options, expectations};

          runTest(testOptions);
        });
      });
    });

  });


  describe(`shall change nearest {boundaries} value,
  if only a number is passed`, function() {

    context(`shall change {boundaries(min)},
    if passed value lay near to it`, function() {
      const ClassOptions = {
        boundaries: [100, 500],
        values: 180,
        step: 20,
        orientation: "vertical",
        hasTooltips: true,
      };
      const options = [
        { boundaries: 0 },
      ];
      const expectations = [
        { boundaries: [0, 500] },
      ];
      const testOptions = {ClassOptions, options, expectations};

      runTest(testOptions);
    });

    context(`shall change {boundaries(max)},
    if passed value lay near to it`, function() {
      const ClassOptions = {
        boundaries: [100, 500],
        values: 180,
        step: 20,
        orientation: "vertical",
        hasTooltips: true,
      };
      const options = [
        { boundaries: 400 },
      ];
      const expectations = [
        { boundaries: [100, 400] },
      ];
      const testOptions = {ClassOptions, options, expectations};

      runTest(testOptions);
    });

  });

}
