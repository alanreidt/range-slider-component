import isNumberInBetween from '../isNumberInBetween';
import findClosestTo from '../findClosestTo';
import isNumberFalsey from '../isNumberFalsey';

/**
 * Restricts a number by adjacent numbers.
 *
 * @param {number} number A subject of the restriction.
 * @param {number} prevNeighbor A bottom limit of the subject.
 * @param {number} nextNeighbor A top limit of the subject.
 *
 * @returns {number} A number, which is prevNeighbor <= number <= nextNeighbor.
 */
const restrictNumberByNeighbors = function restrictNumberByNeighborsFromUtilities(
  number,
  prevNeighbor,
  nextNeighbor,
) {
  if (isNumberFalsey(number)) {
    return NaN;
  }

  if (isNumberFalsey(prevNeighbor) && isNumberFalsey(nextNeighbor)) {
    return number;
  }

  let result = null;

  if (isNumberFalsey(prevNeighbor)) {
    result = number < nextNeighbor ? number : nextNeighbor;
  }

  if (isNumberFalsey(nextNeighbor)) {
    result = number > prevNeighbor ? number : prevNeighbor;
  }

  if (!isNumberFalsey(prevNeighbor) && !isNumberFalsey(nextNeighbor)) {
    result = isNumberInBetween(number, prevNeighbor, nextNeighbor)
      ? number
      : findClosestTo(number, prevNeighbor, nextNeighbor);
  }

  return result;
};

export default restrictNumberByNeighbors;
