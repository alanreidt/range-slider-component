/**
 * Defines whether a number is between start and end, excluding edges, or not.
 *
 * @param {number} number A number, which is checked for attachment to interval.
 * @param {number} start A start of the interval.
 * @param {number} end An end of the interval.
 */
const isNumberBetween = function isNumberBetweenFromUtilities(
  number,
  start,
  end,
) {
  const areArgumentsIncludeNull = [...arguments].includes(null);

  if (areArgumentsIncludeNull) {
    return false;
  }

  if (number === Infinity || number === -Infinity) {
    return number === start || number === end;
  }

  if (start > end) {
    [start, end] = [end, start];
  }

  return number > start && number < end;
};

export default isNumberBetween;
