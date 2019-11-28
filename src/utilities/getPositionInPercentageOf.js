import { isValueInBetween } from "./isValueInBetween";
/**
 * Returns position of the value in the range in percentages, if it's possible.
 * Otherwise, returns NaN
 *
 * @param {number} value The value, which position to be calculated.
 * @param {number[]} range The range, whick value is compared to.
 * @returns {number} The position of the value in percentages.
 */
export function getPositionInPercentageOf(value, range) {
  let [start, end] = range;
  if (start > end) {
    [start, end] = [end, start];
  }
  if (!isValueInBetween(value, start, end)) {
    return NaN;
  }
  let difference = end - start;
  value = value - start;
  let result = value / difference * 100;
  return `${(result - Math.trunc(result)) ? result.toFixed(5) : result}%`;
}
