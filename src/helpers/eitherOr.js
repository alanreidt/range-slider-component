import { either } from "../utilities";

/**
 * Wrapper on either utility function.
 */
export function eitherOr(fallback) {
  return (origin) => either(origin, fallback);
}
