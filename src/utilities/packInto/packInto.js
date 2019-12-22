import { isValueInBetween } from "../isValueInBetween/isValueInBetween";
import { getNearestTo } from "../getNearestTo/getNearestTo";

export function packInto(value, start, end) {
  return isValueInBetween(value, start, end)
    ? value
    : getNearestTo(value, start, end);
}
