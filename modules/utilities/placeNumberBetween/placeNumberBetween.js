import isNumberInBetween from '../isNumberInBetween';
import findClosestTo from '../findClosestTo';

const placeNumberBetween = function placeNumberBetweenFromUtilities(
  number,
  start,
  end,
) {
  return isNumberInBetween(number, start, end)
    ? number
    : findClosestTo(number, start, end);
};

export default placeNumberBetween;
