import { findClosestDivisible } from "../../utilities";

export function coordinateWithStep(value, step, offset = 0) {
  const closestDivisible = findClosestDivisible(value - offset, step);

  return closestDivisible + offset;
}
