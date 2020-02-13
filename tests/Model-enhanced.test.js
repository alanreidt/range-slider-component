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
      given: `object with "parseFloat-applicable" options`,
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
      given: `object with "values" aren't divisible by "step"`,
      should: `return the validated "values"`,
      actual: new Model({
        boundaries: [0, 500],
        step: 100,
        values: 190,
      }).getOptions().values,
      expected: [200],
    });

    assert({
      given: `object with "values" aren't divisible by "step"`,
      should: `return the validated "values"`,
      actual: new Model({
        boundaries: [-500, 500],
        step: 250,
        values: -100,
      }).getOptions().values,
      expected: [0],
    });

    assert({
      given: `object with "values" out of slider boundaries`,
      should: `return the "values" equals to one/both of the slider boundaries`,
      actual: new Model({
        boundaries: [-500, 500],
        step: 1,
        values: [-1000, 1000],
      }).getOptions().values,
      expected: [-500, 500],
    });

    assert({
      given: `object with "step" isn't a factor of slider range`,
      should: `return the validated "step"`,
      actual: new Model({
        boundaries: [-500, 500],
        step: 130,
      }).getOptions().step,
      expected: 125,
    });

    assert({
      given: `object with "step" out of slider range`,
      should: `return the "step" equals to the slider range`,
      actual: new Model({
        boundaries: [-500, 500],
        step: 2000,
      }).getOptions().step,
      expected: 1000,
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

    assert({
      given: `object with "boundaries" excluding previous "values"`,
      should: `return the "values" equals to one/both of the slider boundaries`,
      actual: new Model(initialOptions)
        .setOptions({
          boundaries: [0, 200],
        })
        .getOptions().values,
      expected: [0, 140],
    });

    assert({
      given: `object with "boundaries" aren't divisible by previous "step"`,
      should: `return the "step" is a factor of the "boundaries"`,
      actual: new Model(initialOptions)
        .setOptions({
          boundaries: [0, 250],
        })
        .getOptions().step,
      expected: 25,
    });

    assert({
      given: `object with "boundaries" excluding previous "step"`,
      should: `return the "step" equals to the slider range`,
      actual: new Model(initialOptions)
        .setOptions({
          boundaries: [0, 10],
        })
        .getOptions().step,
      expected: 10,
    });

    assert({
      given: `object with "step" isn't a factor of previous "values"`,
      should: `return the "values" divisible by the "step"`,
      actual: new Model(initialOptions)
        .setOptions({
          step: 100,
        })
        .getOptions().values,
      expected: [-100, 100],
    });

    assert({
      given: `object with "values" array length > than length of initialization array`,
      should: `return the "values" with initialization array length"`,
      actual: new Model({ ...initialOptions, values: 0 })
        .setOptions({
          values: [100, 200, 300],
        })
        .getOptions().values,
      expected: [100],
    });

    assert({
      given: `object with "values" array length > than length of initialization array`,
      should: `return the "values" with initialization array length"`,
      actual: new Model({ ...initialOptions, values: [0, 200] })
        .setOptions({
          values: [100, 200, 300],
        })
        .getOptions().values,
      expected: [100, 200],
    });
  });
});
