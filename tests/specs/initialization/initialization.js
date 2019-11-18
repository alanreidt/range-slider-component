import {initializationWithDefaults} from "./initializationWithDefaults";
import {initializationWithPartDefaults} from "./initializationWithPartDefaults";
import {initializationWithIncorrectFixed} from "./initializationWithIncorrectFixed";
import {initializationWithMixedInputFixed} from "./initializationWithMixedInputFixed";
import { testClass } from "../../testUtilities";
import { Slider } from "../../../src/Slider";

export function initialization() {
  const Class = Slider;
  const methodGetter = "getValues";

  const runTest = testClass({Class, methodGetter});

  describe("shall assign default values for unpassed parameters", function () {

    context("shall assign default values, if nothing is passed", function() {
      const expectations = [{
        boundaries: [0, 100],
        values: [50],
        step: 1,
        orientation: "horizontal",
        hasTooltips: false,
      }];
      const testOptions = {expectations};

      runTest(testOptions);
    });

    context("shall assign default values for unpassed parameters, if only part is passed", function() {
      const ClassOptions = {
        boundaries: [5000, 40000],
        values: 20000,
        step: 50,
        orientation: "vertical",
      };
      const expectations = [{
        boundaries: [5000, 40000],
        values: [20000],
        step: 50,
        orientation: "vertical",
        hasTooltips: false,
      }];
      const testOptions = {ClassOptions, expectations};

      runTest(testOptions);
    });

  });


  describe("shall assign fixed values for incorrect arguments", function() {

    context("shall assign default value if incorrect one is passed", function() {
      const ClassOptions = {
        boundaries: ["hundred", 200],
        values: [25, "p100"],
        step: -20,
        orientation: "right",
        hasTooltips: 7,
      };
      const expectations = [{
        boundaries: [0, 200],
        values: [25],
        step: 1,
        orientation: "horizontal",
        hasTooltips: false,
      }];
      const testOptions = {ClassOptions, expectations};

      runTest(testOptions);
    });

    context("shall parse number from mixed inputs", function() {
      const ClassOptions = {
        boundaries: [0, "1000px"],
        values: ["0$", 600],
        step: "100",
      };
      const expectations = [{
        boundaries: [0, 1000],
        values: [0, 600],
        step: 100,
        orientation: "horizontal",
        hasTooltips: false,
      }];
      const testOptions = {ClassOptions, expectations};

      runTest(testOptions);
    });

  });


  describe(`shall accept array of {value} values`, function() {

    it(`shall limit array of {value} to 8 values`);

    context(`shall accept array of {value} values`, function() {
      const ClassOptions = {
        boundaries: [100, 500],
        values: [100, 200, 300, 460],
        step: 20,
        orientation: "vertical",
        hasTooltips: true,
      };
      const expectations = [
        { values: [100, 200, 300, 460] },
      ];
      const testOptions = {ClassOptions, expectations};

      runTest(testOptions);
    });

    context(`shall accept array of {value} values and correct incorrect`, function() {
      const ClassOptions = {
        boundaries: [100, 500],
        values: [100, 200, 300, "Ben", 460, false],
        step: 20,
        orientation: "vertical",
        hasTooltips: true,
      };
      const expectations = [
        { values: [100, 200, 300, 460] },
      ];
      const testOptions = {ClassOptions, expectations};

      runTest(testOptions);
    });

  });


  describe("{value} shall be equal to average of {boundaries} by default", function() {
    const ClassOptions = {
      boundaries: [100, 500],
      step: 20,
      orientation: "vertical",
      hasTooltips: true,
    };
    const expectations = [
      { values: [200] },
    ];
    const testOptions = {ClassOptions, expectations};

    runTest(testOptions);
  });

}
