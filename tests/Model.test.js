import assert from "assert";

import { testClass, makeTestClass, template } from "./testUtilities";
import { Model } from "../src/Model";

describe("Model", () => {
  describe("Initialization test", () => {
    const Class = Model;
    const methodGetter = "getOptions";
    const runTest = testClass({ Class, methodGetter });

    describe("shall assign default values for not passed parameters", () => {
      context("shall assign default values, if nothing is passed", () => {
        const expectations = [
          {
            boundaries: [0, 100],
            values: [50],
            step: 1,
            orientation: "horizontal",
            hasTooltips: false,
          },
        ];
        const testOptions = { expectations };

        runTest(testOptions);
      });

      context(
        "shall assign default values for not passed parameters, if only part is passed",
        () => {
          const ClassOptions = {
            boundaries: [5000, 40000],
            values: 20000,
            step: 50,
            orientation: "vertical",
          };
          const expectations = [
            {
              boundaries: [5000, 40000],
              values: [20000],
              step: 50,
              orientation: "vertical",
              hasTooltips: false,
            },
          ];
          const testOptions = { ClassOptions, expectations };

          runTest(testOptions);
        },
      );
    });

    describe("shall assign fixed values for incorrect arguments", () => {
      context("shall assign default value if incorrect one is passed", () => {
        const ClassOptions = {
          boundaries: ["hundred", 200],
          values: [25, "p100"],
          step: -20,
          orientation: "right",
          hasTooltips: 7,
        };
        const expectations = [
          {
            boundaries: [0, 200],
            values: [25],
            step: 1,
            orientation: "horizontal",
            hasTooltips: false,
          },
        ];
        const testOptions = { ClassOptions, expectations };

        runTest(testOptions);
      });

      context("shall parse number from mixed inputs", () => {
        const ClassOptions = {
          boundaries: [0, "1000px"],
          values: ["0$", 600],
          step: "100",
        };
        const expectations = [
          {
            boundaries: [0, 1000],
            values: [0, 600],
            step: 100,
            orientation: "horizontal",
            hasTooltips: false,
          },
        ];
        const testOptions = { ClassOptions, expectations };

        runTest(testOptions);
      });
    });

    describe(`shall accept array of {value} values`, () => {
      it(`shall limit array of {value} to 8 values`);

      context(`shall accept array of {value} values`, () => {
        const ClassOptions = {
          boundaries: [100, 500],
          values: [100, 200, 300, 460],
          step: 20,
          orientation: "vertical",
          hasTooltips: true,
        };
        const expectations = [{ values: [100, 200, 300, 460] }];
        const testOptions = { ClassOptions, expectations };

        runTest(testOptions);
      });

      context(
        `shall accept array of {value} values and correct incorrect`,
        () => {
          const ClassOptions = {
            boundaries: [100, 500],
            values: [100, 200, 300, "Ben", 460, false],
            step: 20,
            orientation: "vertical",
            hasTooltips: true,
          };
          const expectations = [{ values: [100, 200, 300, 460] }];
          const testOptions = { ClassOptions, expectations };

          runTest(testOptions);
        },
      );
    });

    describe("{value} shall be equal to average of {boundaries} by default", () => {
      const ClassOptions = {
        boundaries: [100, 500],
        step: 20,
        orientation: "vertical",
        hasTooltips: true,
      };
      const expectations = [{ values: [300] }];
      const testOptions = { ClassOptions, expectations };

      runTest(testOptions);
    });
  });

  describe("Reassignment test", () => {
    const Class = Model;
    const method = "setOptions";
    const methodGetter = "getOptions";
    const runTest = testClass({ Class, method, methodGetter });

    describe("shall change values, if correct one is passed", () => {
      const options = [
        {
          boundaries: [100, 500],
          values: 180,
          step: 20,
        },
      ];
      const expectations = [
        {
          ...options[0],
          values: [180],
        },
      ];
      const testOptions = { options, expectations };

      runTest(testOptions);
    });

    describe("shall not change values, if incorrect one is passed", () => {
      const options = [
        {
          boundaries: [true, false],
          values: false,
          step: "two",
        },
      ];
      const expectations = [
        {
          boundaries: [0, 100],
          values: [50],
          step: 1,
          orientation: "horizontal",
          hasTooltips: false,
        },
      ];
      const testOptions = { options, expectations };

      runTest(testOptions);
    });

    describe("shall correct values", () => {
      context(
        `shall correct {value},
      if passed value isn't correspond to {step}`,
        () => {
          const options = [
            { boundaries: [0, 500], step: 100, values: 190 },
            { boundaries: [-500, 500], step: 250, values: -100 },
            { boundaries: [-1000, -500], step: 50, values: -525 },
          ];
          const expectations = [
            { values: [200] },
            { values: [0] },
            { values: [-500] },
          ];
          const testOptions = { options, expectations };

          runTest(testOptions);
        },
      );

      context(
        `shall correct {value},
      if passed value is out of {boundaries}`,
        () => {
          const options = [
            { boundaries: [-500, 500], values: 1000 },
            { boundaries: [-500, 500], values: -1000 },
            { boundaries: [-500, 500], values: [-1000, 1000] },
          ];
          const expectations = [
            { boundaries: [-500, 500], values: [0, 500] },
            { boundaries: [-500, 500], values: [-500, 100] },
            { boundaries: [-500, 500], values: [-500, 500] },
          ];
          const ClassOptions = {
            boundaries: [0, 100],
            values: [0, 100],
          };
          const testOptions = { ClassOptions, options, expectations };

          runTest(testOptions);
        },
      );

      context(
        `shall correct {step},
      if passed value isn't correspond to {boundaries(range)}`,
        () => {
          const options = [
            { boundaries: [0, 100], step: 15 },
            { boundaries: [0, 300], step: 250 },
            { boundaries: [-500, 500], step: 105 },
          ];
          const expectations = [
            { boundaries: [0, 100], step: 20 },
            { boundaries: [0, 300], step: 300 },
            { boundaries: [-500, 500], step: 100 },
          ];
          const testOptions = { options, expectations };

          runTest(testOptions);
        },
      );

      context(
        `shall correct {step},
      if passed value is bigger than difference of {boundaries(range)}`,
        () => {
          const options = [
            { step: 200 },
            { boundaries: [300, 900], step: 1000 },
            { boundaries: [-500, 500], step: 2000 },
          ];
          const expectations = [
            { step: 100 },
            { boundaries: [300, 900], step: 600 },
            { boundaries: [-500, 500], step: 1000 },
          ];
          const testOptions = { options, expectations };

          runTest(testOptions);
        },
      );

      context(
        `{boundaries} on change, shall correct {value},
      if it became out of the range`,
        () => {
          const options = [
            { boundaries: [200, 500] },
            { boundaries: [-500, -200] },
          ];
          const expectations = [
            { boundaries: [200, 500], values: [200] },
            { boundaries: [-500, -200], values: [-200] },
          ];
          const ClassOptions = {
            values: 100,
          };
          const testOptions = { ClassOptions, options, expectations };

          runTest(testOptions);
        },
      );

      context(
        `{boundaries} on change, shall correct {step},
      if it stopped to correspond to the range`,
        () => {
          const options = [{ boundaries: [0, 90] }, { boundaries: [-50, 0] }];
          const expectations = [
            { boundaries: [0, 90], step: 18 },
            { boundaries: [-50, 0], step: 25 },
          ];
          const ClassOptions = {
            step: 20,
          };
          const testOptions = { ClassOptions, options, expectations };

          runTest(testOptions);
        },
      );

      context(
        `{boundaries} on change shall correct {step}, if it became bigger,
      than difference of {boundaries(range)}`,
        () => {
          const options = [{ boundaries: [0, 90] }, { boundaries: [-50, 0] }];
          const expectations = [
            { boundaries: [0, 90], step: 90 },
            { boundaries: [-50, 0], step: 50 },
          ];
          const ClassOptions = {
            step: 100,
          };
          const testOptions = { ClassOptions, options, expectations };

          runTest(testOptions);
        },
      );

      context(
        `{step} on change, shall correct {value},
      if it stopped to correspond to its value`,
        () => {
          const options = [{ step: 20 }, { step: 50 }];
          const expectations = [
            { step: 20, values: [80] },
            { step: 50, values: [50] },
          ];
          const ClassOptions = {
            values: 70,
          };
          const testOptions = { ClassOptions, options, expectations };

          runTest(testOptions);
        },
      );
    });

    describe("shall restrict values after initialization", () => {
      describe("restrict {values} quantity (length) after initialization", () => {
        context("restrict default {values} quantity (length)", () => {
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

        describe("restrict changed {values} quantity (length)", () => {
          context("preserve single value", () => {
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

          context("preserve 2 values", () => {
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

      describe(`shall handle passed array with length less,
      than length of the current array`, () => {
        context(`change closest values`, () => {
          const options = [
            { values: 300 },
            { values: [-200, 300] },
            { values: [-200, 5, 300] },
            { values: [-200, 5, 300, 450] },
            { values: [-500, 5, 300, 450] },
            { values: [-500, -300, 300, 450] },
          ];
          const expectations = [
            { values: [-400, -100, 0, 300, 500] },
            { values: [-400, -200, 0, 300, 500] },
            { values: [-400, -200, 5, 300, 500] },
            { values: [-400, -200, 5, 300, 450] },
            { values: [-500, -100, 5, 300, 450] },
            { values: [-500, -300, 0, 300, 450] },
          ];
          const ClassOptions = {
            boundaries: [-500, 500],
            values: [-400, -100, 0, 200, 500],
          };
          const testOptions = { ClassOptions, options, expectations };

          runTest(testOptions);
        });

        context(`handle close inputted values`, () => {
          const options = [
            { values: 100 },
            { values: [10, 20] },
            { values: [20, 10] },
            { values: [-10, 10, 20] },
            { values: [150, 220, 400] },
          ];
          const expectations = [
            { values: [-400, -100, 0, 100, 500] },
            { values: [-400, -100, 10, 20, 500] },
            { values: [-400, -100, 10, 20, 500] },
            { values: [-400, -100, -10, 10, 20] },
            { values: [-400, -100, 150, 220, 400] },
          ];
          const ClassOptions = {
            boundaries: [-500, 500],
            values: [-400, -100, 0, 200, 500],
          };
          const testOptions = { ClassOptions, options, expectations };

          runTest(testOptions);
        });
      });

      describe(`shall handle passed array with length more,
      than length of the current array`, () => {
        context(`change closest`, () => {
          const options = [
            { values: [-200, 5, 300, 450] },
            { values: [-200, 5, 450, 300] },
            { values: [-200, -500, 5, 300] },
            { values: [-200, -500, 5, 450, 300] },
          ];
          const expectations = [
            { values: [-200, 5, 300] },
            { values: [-200, 5, 300] },
            { values: [-200, 5, 300] },
            { values: [-200, 5, 300] },
          ];
          const ClassOptions = {
            boundaries: [-500, 500],
            values: [-100, 0, 200],
          };
          const testOptions = { ClassOptions, options, expectations };

          runTest(testOptions);
        });

        context(`handle close inputted values`, () => {
          const options = [
            { values: [-10, 10, 20, 500] },
            { values: [10, -10, 500, 20] },
            { values: [-200, -10, 10, 20, 500] },
            { values: [-10, 10, 20, 500, 50] },
          ];
          const expectations = [
            { values: [-10, 10, 20] },
            { values: [-10, 10, 20] },
            { values: [-10, 10, 20] },
            { values: [-10, 10, 50] },
          ];
          const ClassOptions = {
            boundaries: [-500, 500],
            values: [-100, 0, 200],
          };
          const testOptions = { ClassOptions, options, expectations };

          runTest(testOptions);
        });

        context(`cut exceed length`, () => {
          const options = [
            { values: [-200, 10, 300, 500] },
            { values: [-200, 10, 300, 450, 500] },
          ];
          const expectations = [
            { values: [-200, 10, 300] },
            { values: [-200, 10, 300] },
          ];
          const ClassOptions = {
            boundaries: [-500, 500],
            values: [-100, 0, 200],
          };
          const testOptions = { ClassOptions, options, expectations };

          runTest(testOptions);
        });
      });

      describe(`shall handle passed array with length equal to
      length of the current array`, () => {
        context(`assign as is (sorting only)`, () => {
          const options = [
            { values: [-200, 5, 300] },
            { values: [-200, 5, 450] },
            { values: [-200, -500, 5] },
            { values: [100, 200, 300] },
          ];
          const expectations = [
            { values: [-200, 5, 300] },
            { values: [-200, 5, 450] },
            { values: [-500, -200, 5] },
            { values: [100, 200, 300] },
          ];
          const ClassOptions = {
            boundaries: [-500, 500],
            values: [-100, 0, 200],
          };
          const testOptions = { ClassOptions, options, expectations };

          runTest(testOptions);
        });
      });
    });

    describe(`shall change nearest {boundaries} value,
    if only a number is passed`, () => {
      context(
        `shall change {boundaries(min)},
      if passed value lay near to it`,
        () => {
          const ClassOptions = {
            boundaries: [100, 500],
            values: 180,
            step: 20,
            orientation: "vertical",
            hasTooltips: true,
          };
          const options = [{ boundaries: 0 }];
          const expectations = [{ boundaries: [0, 500] }];
          const testOptions = { ClassOptions, options, expectations };

          runTest(testOptions);
        },
      );

      context(
        `shall change {boundaries(max)},
      if passed value lay near to it`,
        () => {
          const ClassOptions = {
            boundaries: [100, 500],
            values: 180,
            step: 20,
            orientation: "vertical",
            hasTooltips: true,
          };
          const options = [{ boundaries: 400 }];
          const expectations = [{ boundaries: [100, 400] }];
          const testOptions = { ClassOptions, options, expectations };

          runTest(testOptions);
        },
      );
    });
  });

  describe("setValueAt method", () => {
    context("shall change value at appropriate index", () => {
      const classOptions = { values: [10, 30, 50] };
      const testOptions = [
        [0, 20],
        [1, 40],
        [2, 60],
        [1, 20],
        [2, 40],
      ];
      const expectations = [
        [20, 30, 50],
        [10, 40, 50],
        [10, 30, 60],
        [10, 20, 50],
        [10, 30, 40],
      ];

      expectations.forEach((expectation, i) => {
        const model = new Model(classOptions);
        const testOption = testOptions[i];

        it(`result of value ${testOption[1]} set at index ${testOption[0]} equals to ${expectation} (was ${classOptions.values})`, () => {
          model.setValueAt(...testOption);

          assert.deepEqual(model.getOptions().values, expectation);
        });
      });
    });

    context("shall restrict value to adjacent values", () => {
      const classOptions = { values: [10, 30, 50] };
      const testOptions = [
        [0, -20],
        [0, 100],
        [1, -50],
        [1, 200],
        [2, 20],
        [2, 500],
      ];
      const expectations = [
        [0, 30, 50],
        [30, 30, 50],
        [10, 10, 50],
        [10, 50, 50],
        [10, 30, 30],
        [10, 30, 100],
      ];

      expectations.forEach((expectation, i) => {
        const model = new Model(classOptions);
        const testOption = testOptions[i];

        it(`result of value ${testOption[1]} set at index ${testOption[0]} equals to ${expectation} (was ${classOptions.values})`, () => {
          model.setValueAt(...testOption);

          assert.deepEqual(model.getOptions().values, expectation);
        });
      });
    });

    context("shall handle “out of length” index", () => {
      const classOptions = { values: [10, 30, 50] };
      const testOptions = [
        [5, 20],
        [45, 20],
        [-2, 20],
      ];
      const expectations = new Array(testOptions.length).fill(
        classOptions.values,
      );

      expectations.forEach((expectation, i) => {
        const model = new Model(classOptions);
        const testOption = testOptions[i];

        it(`result of value ${testOption[1]} set at index ${testOption[0]} equals to ${expectation} (was ${classOptions.values})`, () => {
          model.setValueAt(...testOption);

          assert.deepEqual(model.getOptions().values, expectation);
        });
      });
    });

    describe("shall catch garbage input", () => {
      context("handle incorrect index parameter", () => {
        const classOptions = { values: [10, 30, 50] };
        const testOptions = [
          [null, 50],
          [undefined, 50],
          [NaN, 50],
          ["text", 50],
          ["text123", 50],
        ];
        const expectations = new Array(testOptions.length).fill(
          classOptions.values,
        );

        expectations.forEach((expectation, i) => {
          const model = new Model(classOptions);
          const testOption = testOptions[i];

          it(`result of value ${testOption[1]} set at index ${testOption[0]} equals to ${expectation}`, () => {
            model.setValueAt(...testOption);

            assert.deepEqual(model.getOptions().values, expectation);
          });
        });
      });

      context("handle incorrect value parameter", () => {
        const classOptions = { values: [10, 30, 50] };
        const testOptions = [
          [0, null],
          [1, undefined],
          [2, NaN],
          [0, "text"],
          [1, "text123"],
        ];
        const expectations = new Array(testOptions.length).fill(
          classOptions.values,
        );

        expectations.forEach((expectation, i) => {
          const model = new Model(classOptions);
          const testOption = testOptions[i];

          it(`result of value ${testOption[1]} set at index ${testOption[0]} equals to ${expectation}`, () => {
            model.setValueAt(...testOption);

            assert.deepEqual(model.getOptions().values, expectation);
          });
        });
      });
    });
  });
});
