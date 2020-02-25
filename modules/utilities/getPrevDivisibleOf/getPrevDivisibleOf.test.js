import { describe } from 'riteway';

import getPrevDivisibleOf from './getPrevDivisibleOf';

describe('getPrevDivisibleOf', async (assert) => {
  assert({
    given: 'no arguments',
    should: 'return zero',
    actual: getPrevDivisibleOf(),
    expected: 0,
  });
});
