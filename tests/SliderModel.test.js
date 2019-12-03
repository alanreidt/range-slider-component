import { testClass } from "./testUtilities";
import { SliderModel } from "../src/SliderModel";


export function testSliderModel() {


  describe("SliderModel", function () {

    describe("Initialization test", function () {
      const Class = SliderModel;
      const methodGetter = "getValues";
      const runTest = testClass({ Class, methodGetter });

      describe("shall assign default values for unpassed parameters", function () {
        context("shall assign default values, if nothing is passed", function () {
          const expectations = [{
            boundaries: [0, 100],
            values: [50],
            step: 1,
            orientation: "horizontal",
            hasTooltips: false,
          }];
          const testOptions = { expectations };

          runTest(testOptions);
        });

        context("shall assign default values for unpassed parameters, if only part is passed", function () {
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
          const testOptions = { ClassOptions, expectations };

          runTest(testOptions);
        });
      });


      describe("shall assign fixed values for incorrect arguments", function () {
        context("shall assign default value if incorrect one is passed", function () {
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
          const testOptions = { ClassOptions, expectations };

          runTest(testOptions);
        });

        context("shall parse number from mixed inputs", function () {
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
          const testOptions = { ClassOptions, expectations };

          runTest(testOptions);
        });
      });


      describe(`shall accept array of {value} values`, function () {
        it(`shall limit array of {value} to 8 values`);

        context(`shall accept array of {value} values`, function () {
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
          const testOptions = { ClassOptions, expectations };

          runTest(testOptions);
        });

        context(`shall accept array of {value} values and correct incorrect`, function () {
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
          const testOptions = { ClassOptions, expectations };

          runTest(testOptions);
        });

        context(`shall filter duplicated values`, function () {
          const ClassOptions = {
            boundaries: [100, 500],
            values: [100, 100, 200, 300, 300, 460],
            step: 20,
            orientation: "vertical",
            hasTooltips: true,
          };
          const expectations = [
            { values: [100, 200, 300, 460] },
          ];
          const testOptions = { ClassOptions, expectations };

          runTest(testOptions);
        });
      });


      describe("{value} shall be equal to average of {boundaries} by default", function () {
        const ClassOptions = {
          boundaries: [100, 500],
          step: 20,
          orientation: "vertical",
          hasTooltips: true,
        };
        const expectations = [
          { values: [300] },
        ];
        const testOptions = { ClassOptions, expectations };

        runTest(testOptions);
      });
    });



    describe("Reassignment test", function () {
      const Class = SliderModel;
      const method = "setValues";
      const methodGetter = "getValues";
      const runTest = testClass({ Class, method, methodGetter });

      describe("shall change values, if correct one is passed", function () {
        let options = [{
          boundaries: [100, 500],
          values: 180,
          step: 20,
        }];
        let expectations = [{
          ...options[0],
          values: [180]
        }];
        let testOptions = { options, expectations };

        runTest(testOptions);
      });


      describe("shall not change values, if incorrect one is passed", function () {
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
        let testOptions = { options, expectations };

        runTest(testOptions);
      });


      describe("shall correct values", function () {
        context(`shall correct {value},
        if passed value isn't correspond to {step}`, function () {
          let options = [
            { boundaries: [0, 500], step: 100, values: 190 },
            { boundaries: [-500, 500], step: 250, values: -100 },
            { boundaries: [-1000, -500], step: 50, values: -525 },
          ];
          let expectations = [
            { values: [200] },
            { values: [0] },
            { values: [-500] },
          ];
          let testOptions = { options, expectations };

          runTest(testOptions);
        });

        context(`shall correct {value},
        if passed value is out of {boundaries}`, function () {
          let options = [
            { boundaries: [-500, 500], values: 1000 },
            { boundaries: [-500, 500], values: -1000 },
            { boundaries: [-500, 500], values: [-1000, 1000] },
          ];
          let expectations = [
            { boundaries: [-500, 500], values: [0, 500] },
            { boundaries: [-500, 500], values: [-500, 100] },
            { boundaries: [-500, 500], values: [-500, 500] },
          ];
          let ClassOptions = {
            boundaries: [0, 100],
            values: [0, 100],
          };
          let testOptions = { ClassOptions, options, expectations };

          runTest(testOptions);
        });

        context(`shall correct {step},
        if passed value isn't correspond to {boundaries(range)}`, function () {
          let options = [
            { boundaries: [0, 100], step: 15 },
            { boundaries: [0, 300], step: 250 },
            { boundaries: [-500, 500], step: 105 },
          ];
          let expectations = [
            { boundaries: [0, 100], step: 20 },
            { boundaries: [0, 300], step: 300 },
            { boundaries: [-500, 500], step: 100 },
          ];
          let testOptions = { options, expectations };

          runTest(testOptions);
        });

        context(`shall correct {step},
        if passed value is bigger than difference of {boundaries(range)}`, function () {
          let options = [
            { step: 200 },
            { boundaries: [300, 900], step: 1000 },
            { boundaries: [-500, 500], step: 2000 },
          ];
          let expectations = [
            { step: 100 },
            { boundaries: [300, 900], step: 600 },
            { boundaries: [-500, 500], step: 1000 },
          ];
          let testOptions = { options, expectations };

          runTest(testOptions);
        });

        context(`{boundaries} on change, shall correct {value},
        if it became out of the range`, function () {
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
          let testOptions = { ClassOptions, options, expectations };

          runTest(testOptions);
        });

        context(`{boundaries} on change, shall correct {step},
        if it stopped to correspond to the range`, function () {
          let options = [
            { boundaries: [0, 90] },
            { boundaries: [-50, 0] },
          ];
          let expectations = [
            { boundaries: [0, 90], step: 18 },
            { boundaries: [-50, 0], step: 25 },
          ];
          let ClassOptions = {
            step: 20,
          };
          let testOptions = { ClassOptions, options, expectations };

          runTest(testOptions);
        });

        context(`{boundaries} on change shall correct {step}, if it became bigger,
        than difference of {boundaries(range)}`, function () {
          let options = [
            { boundaries: [0, 90] },
            { boundaries: [-50, 0] },
          ];
          let expectations = [
            { boundaries: [0, 90], step: 90 },
            { boundaries: [-50, 0], step: 50 },
          ];
          let ClassOptions = {
            step: 100,
          };
          let testOptions = { ClassOptions, options, expectations };

          runTest(testOptions);
        });

        context(`{step} on change, shall correct {value},
        if it stopped to correspond to its value`, function () {
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
          let testOptions = { ClassOptions, options, expectations };

          runTest(testOptions);
        });
      });


      describe("shall restrict values after initialization", function () {
        describe("restrict {values} quantity (length) after initialization", function () {
          context("restrict default {values} quantity (length)", function () {
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
            const testOptions = { options, expectations };

            runTest(testOptions);
          });

          describe("restrict changed {values} quantity (length)", function () {
            context("preserve single value", function () {
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
              const testOptions = { ClassOptions, options, expectations };

              runTest(testOptions);
            });

            context("preserve 2 values", function () {
              const ClassOptions = {
                values: [20, 80],
              };
              const options = [
                { values: 30 },
                { values: [30, 90] },
                { values: [30, 90, 100] },
              ];
              const expectations = [
                { values: [30, 80] },
                { values: [30, 90] },
                { values: [30, 90] },
              ];
              const testOptions = { ClassOptions, options, expectations };

              runTest(testOptions);
            });
          });
        });


        describe("shall change closest values, when length of passed array is less", function() {
          context(`change closest values`, function () {
            let options = [
              { values: 300 },
              { values: [-200, 300] },
              { values: [-200, 5, 300] },
              { values: [-200, 5, 300, 450] },
            ];
            let expectations = [
              { values: [-400, -100, 0, 300, 500] },
              { values: [-400, -200, 0, 300, 500] },
              { values: [-400, -200, 5, 300, 500] },
              { values: [-400, -200, 5, 300, 450] },
            ];
            let ClassOptions = {
              boundaries: [-500, 500],
              values: [-400, -100, 0, 200, 500],
            };
            let testOptions = { ClassOptions, options, expectations };

            runTest(testOptions);
          });

          context(`handle close inputed values`, function () {
            let options = [
              { values: 100 },
              { values: [10, 20] },
              { values: [20, 10] },
              { values: [-10, 10, 20] },
            ];
            let expectations = [
              { values: [-400, -100, 0, 100, 500] },
              { values: [-400, -100, 10, 20, 500] },
              { values: [-400, -100, 10, 20, 500] },
              { values: [-400, -10, 10, 20, 500] },
            ];
            let ClassOptions = {
              boundaries: [-500, 500],
              values: [-400, -100, 0, 200, 500],
            };
            let testOptions = { ClassOptions, options, expectations };

            runTest(testOptions);
          });
        });
      });


      describe(`shall change nearest {boundaries} value,
      if only a number is passed`, function () {
        context(`shall change {boundaries(min)},
        if passed value lay near to it`, function () {
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
          const testOptions = { ClassOptions, options, expectations };

          runTest(testOptions);
        });

        context(`shall change {boundaries(max)},
        if passed value lay near to it`, function () {
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
          const testOptions = { ClassOptions, options, expectations };

          runTest(testOptions);
        });
      });
    });

  });


}
