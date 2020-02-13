import { describe } from "riteway";

import { Model } from "../src/Model";

describe("Model", async () => {
  const defaultOptions = {
    boundaries: [0, 100],
    step: 1,
    values: [50],
    orientation: "horizontal",
    hasTooltips: false,
  };
  const wrongOptions = {
    boundaries: false,
    values: "seventy",
    step: NaN,
    orientation: 25,
    hasTooltips: 1,
  };

  describe("constructor(newOptions)", async (assert) => {
    const should = "return object with default options";

    assert({
      given: "no arguments",
      should,
      actual: new Model().getOptions(),
      expected: defaultOptions,
    });

    assert({
      given: "object with wrong options",
      should,
      actual: new Model(wrongOptions).getOptions(),
      expected: defaultOptions,
    });

    assert({
      given: `object with "parseFloat-applicable" options values`,
      should: "return object with the validated options",
      actual: new Model({
        boundaries: [0, "1000px"],
        values: ["0$", 600],
        step: "100",
      }).getOptions(),
      expected: {
        ...defaultOptions,
        boundaries: [0, 1000],
        values: [0, 600],
        step: 100,
      },
    });

    assert({
      given: `object with a "values" option value isn't divisible by a "step" option`,
      should: `return the validated "values" option`,
      actual: new Model({
        boundaries: [0, 500],
        step: 100,
        values: 190,
      }).getOptions().values,
      expected: [200],
    });

    assert({
      given: `object with a "values" option value isn't divisible by a "step" option`,
      should: `return the validated "values" option`,
      actual: new Model({
        boundaries: [-500, 500],
        step: 250,
        values: -100,
      }).getOptions().values,
      expected: [0],
    });

    assert({
      given: `object with a "values" option value out of slider edges`,
      should: `return the "values" option value equals to one/both of the slider edges`,
      actual: new Model({
        boundaries: [-500, 500],
        values: [-1000, 1000],
      }).getOptions().values,
      expected: [-500, 500],
    });
  });

  describe("setOptions", async (assert) => {
    const initialOptions = {
      boundaries: [-200, 200],
      values: [-100, 140],
      step: 20,
      orientation: "vertical",
      hasTooltips: true,
    };
    const reassignmentOptions = {
      boundaries: [-200, 500],
      values: [-200, 400],
      step: 100,
    };

    assert({
      given: "object with correct options",
      should: "return object with the validated options",
      actual: new Model(initialOptions)
        .setOptions(reassignmentOptions)
        .getOptions(),
      expected: { ...initialOptions, ...reassignmentOptions },
    });

    assert({
      given: "object with wrong options",
      should: "return object with previous (initial) options",
      actual: new Model(initialOptions).setOptions(wrongOptions).getOptions(),
      expected: initialOptions,
    });
  });
});
