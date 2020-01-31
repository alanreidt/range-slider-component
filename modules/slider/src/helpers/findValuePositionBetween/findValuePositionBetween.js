import { findRatio, toPercentage } from "../../utilities";

/**
 * Returns a position of a value between start and end, if it's possible.
 * Otherwise, returns NaN.
 *
 * @param {number} value The value, which position to be found.
 * @param {number} start The start of a range, where position to be found.
 * @param {number} end The end of a range, where position to be found.
 *
 * @returns {number} The position of the value between the start and the end.
 */
export function findValuePositionBetween(value, start, end) {
  if (end === null) {
    return NaN;
  }

  const range = end - start;
  const ratio = findRatio(value, range, start);

  return toPercentage(ratio);
}
