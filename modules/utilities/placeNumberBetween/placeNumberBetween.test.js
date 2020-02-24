import { describe } from 'riteway';

import placeNumberBetween from './placeNumberBetween';

describe('placeNumberBetween', async (assert) => {
  assert({
    given: 'no arguments',
    should: 'return zero',
    actual: placeNumberBetween(),
    expected: 0,
  });
});
