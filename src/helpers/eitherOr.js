import { either } from '../../modules/utilities';

/**
 * Wrapper on either utility function.
 */
const eitherOr = function eitherOrFromHelpers(fallback) {
  return (origin) => either(origin, fallback);
};

export default eitherOr;
