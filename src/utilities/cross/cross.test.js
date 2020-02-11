import { describe } from "riteway";

import { cross } from "./cross";

describe("cross(baseArr, arr)", async (assert) => {
  assert({
    given: "argument",
    should: "return",
    actual: cross(),
    expected: 0,
  });
});
