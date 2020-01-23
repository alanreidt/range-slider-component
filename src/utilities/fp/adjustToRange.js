import { findClosestFactor } from "../findClosestFactor/findClosestFactor";

export function adjustToRange(range) {
  return (step) => findClosestFactor(range, step);
}
