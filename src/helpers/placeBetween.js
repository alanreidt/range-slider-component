import { placeNumberBetween } from '../utilities';

/**
 * Wrapper on placeNumberBetween utility function.
 */
const placeBetween = function placeBetweenFromHelpers(start, end) {
  return (number) => placeNumberBetween(number, start, end);
};

export default placeBetween;
