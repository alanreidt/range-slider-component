import { describe } from 'riteway';

import getAverageOf from './getAverageOf';

describe('getAverageOf', async (assert) => {
  assert({
    given: 'no arguments',
    should: 'return zero',
    actual: getAverageOf(),
    expected: 0,
  });
});
