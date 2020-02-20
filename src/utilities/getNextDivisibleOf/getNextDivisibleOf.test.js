import { describe } from 'riteway';

import getNextDivisibleOf from './getNextDivisibleOf';

describe('getNextDivisibleOf', async (assert) => {
  assert({
    given: 'no arguments',
    should: 'return zero',
    actual: getNextDivisibleOf(),
    expected: 0,
  });
});
