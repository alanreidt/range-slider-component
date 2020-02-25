import { describe } from 'riteway';

import cross from './cross';

describe('cross(baseArr, arr)', async (assert) => {
  assert({
    given: 'baseArr with identical items',
    should: 'return crossed sorted array',
    actual: cross([40, 40, 40, 40], [20]),
    expected: [20, 40, 40, 40],
  });

  assert({
    given: 'baseArr with identical items',
    should: 'return crossed sorted array',
    actual: cross([40, 40, 40, 40], [40]),
    expected: [40, 40, 40, 40],
  });

  assert({
    given: 'baseArr with identical items',
    should: 'return crossed sorted array',
    actual: cross([40, 40, 40, 40], [60]),
    expected: [40, 40, 40, 60],
  });
});
