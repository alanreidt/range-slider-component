import { either } from "../either/either";

/**
 * Wrapper on either utility function.
 */
export function eitherOr(fallback) {
  return (origin) => either(origin, fallback);
}
