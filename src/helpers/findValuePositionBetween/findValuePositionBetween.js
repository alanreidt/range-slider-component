import { findRatio } from "../findRatio";
import { toPercentage } from "../toPercentage";

/**
 * Returns position of a value between start and end, if it's possible.
 * Otherwise, returns NaN
 *
 * @param {number} value The value, which position to be found.
 * @param {number} start The start of the range, where position to be found.
 * @param {number} end The end of the range, where position to be found.
 *
 * @returns {number} The position of the value between start and end.
 */
export function findValuePositionBetween(value, start, end) {
  const range = end - start;
  const ratio = findRatio({
    antecedent: value,
    consequent: range,
    offset: start,
  });

  return toPercentage(ratio);
}
