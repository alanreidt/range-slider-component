import { isValueInBetween } from "../isValueInBetween/isValueInBetween";
import { findClosestTo } from "../findClosestTo/findClosestTo";

export function packInto(value, start, end) {
  return isValueInBetween(value, start, end)
    ? value
    : findClosestTo(value, start, end);
}
