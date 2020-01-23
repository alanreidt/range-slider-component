import { findClosestFactor } from "../../utilities/findClosestFactor/findClosestFactor";

export function adjustToRange(range) {
  return (step) => findClosestFactor(range, step);
}
