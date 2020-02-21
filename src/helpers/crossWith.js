import { cross } from '../utilities';

/**
 * Wrapper on cross utility function.
 */
const crossWith = function crossWith(baseArr) {
  return (arr) => cross(baseArr, arr);
};

export default crossWith;
