import {initializationWithDefaults} from "./initializationWithDefaults";
import {initializationWithPartDefaults} from "./initializationWithPartDefaults";
import {initializationWithIncorrectFixed} from "./initializationWithIncorrectFixed";
import {initializationWithMixedInputFixed} from "./initializationWithMixedInputFixed";

export function initialization() {

  describe("shall assign default values for unpassed parameters", function () {

    context("shall assign default values, if nothing is passed", function() {
      initializationWithDefaults();
    });

    context("shall assign default values for unpassed parameters, if only part is passed", function() {
      initializationWithPartDefaults();
    });

  });


  describe("shall assign fixed values for incorrect arguments", function() {

    context("shall assign default value if incorrect one is passed", function() {
      initializationWithIncorrectFixed();
    });

    context("shall parse number from mixed inputs", function() {
      initializationWithMixedInputFixed();
    });

  });


  describe(`shall accept array of {value} values`, function() {

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

    it(`shall limit array of {value} to 8 values`);

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
    const testOptions = {ClassOptions, options, expectations};

    runTest(testOptions);
  });

}
