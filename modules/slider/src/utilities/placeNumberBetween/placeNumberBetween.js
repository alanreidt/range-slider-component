import { isNumberInBetween } from "../isNumberInBetween/isNumberInBetween";
import { findClosestTo } from "../findClosestTo/findClosestTo";

export function placeNumberBetween(number, start, end) {
  return isNumberInBetween(number, start, end)
    ? number
    : findClosestTo(number, start, end);
}
