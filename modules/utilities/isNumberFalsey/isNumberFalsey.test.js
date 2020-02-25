import { describe } from 'riteway';

import isNumberFalsey from './isNumberFalsey';

describe('isNumberFalsey', async (assert) => {
  const should = 'return true';

  assert({
    given: 'zero',
    should: 'return false',
    actual: isNumberFalsey(0),
    expected: false,
  });

  assert({
    given: 'number',
    should: 'return false',
    actual: isNumberFalsey(50),
    expected: false,
  });

  assert({
    given: 'undefined',
    should,
    actual: isNumberFalsey(undefined),
    expected: true,
  });

  assert({
    given: 'null',
    should,
    actual: isNumberFalsey(null),
    expected: true,
  });

  assert({
    given: 'NaN',
    should,
    actual: isNumberFalsey(NaN),
    expected: true,
  });

  assert({
    given: 'false',
    should,
    actual: isNumberFalsey(false),
    expected: true,
  });

  assert({
    given: 'empty string',
    should,
    actual: isNumberFalsey(''),
    expected: true,
  });

  assert({
    given: 'string with number',
    should,
    actual: isNumberFalsey('20'),
    expected: true,
  });

  assert({
    given: 'string with space',
    should,
    actual: isNumberFalsey(' '),
    expected: true,
  });
});
