import { cross } from "../cross/cross";

export function crossWith(baseArr) {
  return (arr) => cross(baseArr, arr);
}
