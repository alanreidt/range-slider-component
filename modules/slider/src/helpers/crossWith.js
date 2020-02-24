import { cross } from '../../modules/utilities';

/**
 * Wrapper on cross utility function.
 */
const crossWith = function crossWithFromHelpers(baseArray) {
  return (crossingArray) => cross(baseArray, crossingArray);
};

export default crossWith;
