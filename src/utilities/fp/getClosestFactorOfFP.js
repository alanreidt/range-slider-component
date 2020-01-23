import { findClosestFactor } from "../findClosestFactor/findClosestFactor";

export function getClosestFactorOfFP(range) {
  return (step) => findClosestFactor(range, step);
}
