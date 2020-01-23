import { placeValueBetween } from "../placeValueBetween/placeValueBetween";

/**
 * Wrapper on placeValueBetween utility function.
 */
export function placeBetween(start, end) {
  return (number) => placeValueBetween(number, start, end);
}
