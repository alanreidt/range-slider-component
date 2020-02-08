import { describe } from "riteway";

import { restrictNumberByNeighbors } from "./restrictNumberByNeighbors";

describe("restrictNumberByNeighbors", async (assert) => {
  assert({
    given: "prevNeighbor < number < nextNeighbor",
    should: "return number",
    actual: restrictNumberByNeighbors(40, -20, 100),
    expected: 40,
  });

  assert({
    given: "number > nextNeighbor",
    should: "return nextNeighbor",
    actual: restrictNumberByNeighbors(140, -20, 100),
    expected: 100,
  });

  assert({
    given: "number < prevNeighbor",
    should: "return prevNeighbor",
    actual: restrictNumberByNeighbors(-40, -20, 100),
    expected: -20,
  });

  assert({
    given: "prevNeighbor is number falsey, number < nextNeighbor",
    should: "return number",
    actual: restrictNumberByNeighbors(-40, undefined, 100),
    expected: -40,
  });

  assert({
    given: "prevNeighbor is number falsey, number > nextNeighbor",
    should: "return nextNeighbor",
    actual: restrictNumberByNeighbors(140, NaN, 100),
    expected: 100,
  });

  assert({
    given: "nextNeighbor is number falsey, number > prevNeighbor",
    should: "return number",
    actual: restrictNumberByNeighbors(0, -20, ""),
    expected: 0,
  });

  assert({
    given: "nextNeighbor is number falsey, number < prevNeighbor",
    should: "return prevNeighbor",
    actual: restrictNumberByNeighbors(-50, -20, false),
    expected: -20,
  });

  assert({
    given: "prevNeighbor and nextNeighbor are number falsey",
    should: "return number",
    actual: restrictNumberByNeighbors(15, "-20", null),
    expected: 15,
  });

  assert({
    given: "number is not a number",
    should: "return NaN",
    actual: restrictNumberByNeighbors("15", 0, 100),
    expected: NaN,
  });

  assert({
    given: "number is NaN",
    should: "return number",
    actual: restrictNumberByNeighbors(NaN, 0, 100),
    expected: NaN,
  });
});
