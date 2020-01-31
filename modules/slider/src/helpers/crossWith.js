import { cross } from "../utilities";

/**
 * Wrapper on cross utility function.
 */
export function crossWith(baseArr) {
  return (arr) => cross(baseArr, arr);
}
