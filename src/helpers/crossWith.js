import { cross } from '../utilities';

/**
 * Wrapper on cross utility function.
 */
const crossWith = function crossWith(baseArray) {
  return (crossingArray) => cross(baseArray, crossingArray);
};

export default crossWith;
