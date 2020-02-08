import { describe } from "riteway";

import { replaceAt } from "./replaceAt";

describe("replaceAt", async (assert) => {
  assert({
    given: "correct parameters",
    should: "return modified array",
    actual: replaceAt(1, 50, [-20, 30, 60]),
    expected: [-20, 50, 60],
  });

  assert({
    given: "negative index parameter",
    should: "return modified array",
    actual: replaceAt(-2, 50, [-20, 30, 60]),
    expected: [-20, 50, 60],
  });

  assert({
    given: "exceeded index parameter",
    should: "return array with added item",
    actual: replaceAt(10, 50, [-20, 30, 60]),
    expected: [-20, 30, 60, 50],
  });

  assert({
    given: "negative exceeded index parameter",
    should: "return array with first item replaced",
    actual: replaceAt(-10, 50, [-20, 30, 60]),
    expected: [50, 30, 60],
  });

  assert({
    given: "incorrect index parameter",
    should: "return original array",
    actual: replaceAt(null, 50, [-20, 30, 60]),
    expected: [-20, 30, 60],
  });

  assert({
    given: "incorrect array parameter",
    should: "return NaN",
    actual: Number.isNaN(replaceAt(1, 50, 60)),
    expected: true,
  });
});
