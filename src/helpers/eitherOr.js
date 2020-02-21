import { either } from '../utilities';

/**
 * Wrapper on either utility function.
 */
const eitherOr = function eitherOrFromHelpers(fallback) {
  return (origin) => either(origin, fallback);
};

export default eitherOr;
