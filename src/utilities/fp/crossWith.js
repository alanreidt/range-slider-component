import { cross } from "../cross/cross";

/**
 * Wrapper on cross utility function.
 */
export function crossWith(baseArr) {
  return (arr) => cross(baseArr, arr);
}
