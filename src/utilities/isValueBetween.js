/**
 * Defines whether value is between start and end or not.
 *
 * @param {number} value The value, which is checked for attachment to interval.
 * @param {number} start The start of the interval.
 * @param {number} end The end of the interval.
 * @returns {boolean} True, if value is between start and end, false otherwise.
 */
export function isValueBetween(value, start, end) {
  if (Array.from(arguments).includes(null))
    return false;
  if (start > end) {
    [start, end] = [end, start];
  }
  return (value > start) && (value < end);
}
