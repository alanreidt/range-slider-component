import isNumberBetween from '../isNumberBetween';

/**
 * Defines whether a number is between start and end, including edges, or not.
 *
 * @param {number} number A number, which is checked for attachment to interval.
 * @param {number} start A start of the interval.
 * @param {number} end An end of the interval.
 */
const isNumberInBetween = function isNumberInBetweenFromUtilities(
  number,
  start,
  end,
) {
  const areArgumentsIncludeNull = [...arguments].includes(null);

  if (areArgumentsIncludeNull) {
    return false;
  }

  return isNumberBetween(number, start - 1, end + 1);
};

export default isNumberInBetween;
