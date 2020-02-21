import { findClosestFactor } from '../utilities';

/**
 * Wrapper on findClosestFactor utility function.
 * Returns closest step, which divides a range into equal pieces.
 *
 * @param {number} range A difference between the Slider boundaries.
 * @param {number} step A step of the Slider.
 *
 * @returns {number} Adjusted step.
 */
const adjustToRange = function adjustToRangeFromHelpers(range) {
  return (step) => findClosestFactor(range, step);
};

export default adjustToRange;
