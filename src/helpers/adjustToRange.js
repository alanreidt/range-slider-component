import { findClosestFactor } from "../utilities";

/**
 * Wrapper on findClosestFactor utility function.
 * Returns closest step, which divides a range into equal pieces.
 *
 * @param {number} range A difference between the Slider boundaries.
 * @param {number} step A step of the Slider.
 *
 * @returns {number} Adjusted step.
 */
export function adjustToRange(range) {
  return (step) => findClosestFactor(range, step);
}
