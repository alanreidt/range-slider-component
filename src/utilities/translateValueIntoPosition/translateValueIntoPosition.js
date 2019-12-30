import { isValueInBetween } from "../isValueInBetween/isValueInBetween";

/**
 * Translates value into position inside range, if it's possible.
 * Otherwise, returns NaN
 *
 * @param {number} value The value, that to be translated into position.
 * @param {number} range The range, on which the position depends.
 *
 * @returns {number} The position of the value inside range.
 */
export function translateValueIntoPosition(value, range) {
  let [start, end] = range;

  if (start > end) {
    [start, end] = [end, start];
  }

  if (!isValueInBetween(value, start, end)) {
    return NaN;
  }

  const difference = end - start;

  value -= start;

  const result = (value / difference) * 100;

  return `${result - Math.trunc(result) ? result.toFixed(5) : result}%`;
}
