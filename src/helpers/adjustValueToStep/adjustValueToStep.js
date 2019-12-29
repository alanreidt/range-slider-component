import curryRight from "lodash/fp/curryRight";

import { findClosestDivisible } from "../../utilities";

function base(value, step, offset) {
  const closestDivisible = findClosestDivisible(value - offset, step);

  return closestDivisible + offset;
}

export const adjustValueToStep = curryRight(base);
