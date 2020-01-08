import { isNumberInBetween } from "../isNumberInBetween/isNumberInBetween";
import { findClosestTo } from "../findClosestTo/findClosestTo";

export function packInto(value, start, end) {
  return isNumberInBetween(value, start, end)
    ? value
    : findClosestTo(value, start, end);
}
