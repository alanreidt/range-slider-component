import { describe } from 'riteway';

import replaceValueAt from './replaceValueAt';

describe('replaceValueAt(index, value, array)', async (assert) => {
  assert({
    given: 'correct arguments',
    should: 'return modified array',
    actual: replaceValueAt(1, 50, [-20, 30, 60]),
    expected: [-20, 50, 60],
  });

  assert({
    given: 'negative index',
    should: 'return modified array',
    actual: replaceValueAt(-2, 50, [-20, 30, 60]),
    expected: [-20, 50, 60],
  });

  assert({
    given: 'exceeded index',
    should: 'return array with added item',
    actual: replaceValueAt(10, 50, [-20, 30, 60]),
    expected: [-20, 30, 60, 50],
  });

  assert({
    given: 'negative exceeded index',
    should: 'return array with first item replaced',
    actual: replaceValueAt(-10, 50, [-20, 30, 60]),
    expected: [50, 30, 60],
  });

  assert({
    given: 'incorrect index',
    should: 'return original array',
    actual: replaceValueAt(null, 50, [-20, 30, 60]),
    expected: [-20, 30, 60],
  });

  assert({
    given: 'a number as the array argument',
    should: 'return NaN',
    actual: Number.isNaN(replaceValueAt(1, 50, 60)),
    expected: true,
  });

  assert({
    given: '1 item long array',
    should: 'return modified array',
    actual: replaceValueAt(0, 50, [60]),
    expected: [50],
  });

  assert({
    given: 'exceeded index and 1 item long array',
    should: 'return array with added item',
    actual: replaceValueAt(5, 50, [60]),
    expected: [60, 50],
  });

  assert({
    given: 'exceeded negative index and 1 item long array',
    should: 'return array with first item replaced',
    actual: replaceValueAt(-3, 50, [60]),
    expected: [50],
  });
});
