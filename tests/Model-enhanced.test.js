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
