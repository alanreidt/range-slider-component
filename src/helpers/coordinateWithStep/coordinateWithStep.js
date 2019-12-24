import { findClosestDivisible } from "../../utilities";

export function coordinateWithStep(value, step, offset = 0) {
  const normalizedValue = value - offset;
  const closestDivisible = findClosestDivisible(normalizedValue, step);

  return closestDivisible + offset;
}
