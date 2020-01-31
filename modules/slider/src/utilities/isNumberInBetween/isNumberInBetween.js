import { isNumberBetween } from "../isNumberBetween/isNumberBetween";

/**
 * Defines whether a number is between start and end, including edges, or not.
 *
 * @param {number} number A number, which is checked for attachment to interval.
 * @param {number} start A start of the interval.
 * @param {number} end An end of the interval.
 */
export function isNumberInBetween(number, start, end) {
  const areArgumentsIncludeNull = Array.from(arguments).includes(null);

  if (areArgumentsIncludeNull) {
    return false;
  }

  return isNumberBetween(number, start - 1, end + 1);
}
