import { describe } from 'riteway';

import restrictNumberByNeighbors from './restrictNumberByNeighbors';

describe('restrictNumberByNeighbors(number, prevNeighbor, nextNeighbor)', async (assert) => {
  assert({
    given: 'prevNeighbor < number < nextNeighbor',
    should: 'return number',
    actual: restrictNumberByNeighbors(40, -20, 100),
    expected: 40,
  });

  assert({
    given: 'number > nextNeighbor',
    should: 'return nextNeighbor',
    actual: restrictNumberByNeighbors(140, -20, 100),
    expected: 100,
  });

  assert({
    given: 'number < prevNeighbor',
    should: 'return prevNeighbor',
    actual: restrictNumberByNeighbors(-40, -20, 100),
    expected: -20,
  });

  assert({
    given: 'prevNeighbor is falsey number, number < nextNeighbor',
    should: 'return number',
    actual: restrictNumberByNeighbors(-40, undefined, 100),
    expected: -40,
  });

  assert({
    given: 'prevNeighbor is falsey number, number > nextNeighbor',
    should: 'return nextNeighbor',
    actual: restrictNumberByNeighbors(140, NaN, 100),
    expected: 100,
  });

  assert({
    given: 'nextNeighbor is falsey number, number > prevNeighbor',
    should: 'return number',
    actual: restrictNumberByNeighbors(0, -20, ''),
    expected: 0,
  });

  assert({
    given: 'nextNeighbor is falsey number, number < prevNeighbor',
    should: 'return prevNeighbor',
    actual: restrictNumberByNeighbors(-50, -20, false),
    expected: -20,
  });

  assert({
    given: 'prevNeighbor and nextNeighbor are falsey numbers',
    should: 'return number',
    actual: restrictNumberByNeighbors(15, undefined, undefined),
    expected: 15,
  });

  assert({
    given: 'number is not a number type',
    should: 'return NaN',
    actual: Number.isNaN(restrictNumberByNeighbors('15', 0, 100)),
    expected: true,
  });

  assert({
    given: 'number is NaN',
    should: 'return NaN',
    actual: Number.isNaN(restrictNumberByNeighbors(NaN, 0, 100)),
    expected: true,
  });

  assert({
    given: 'number and prevNeighbor are falsey numbers',
    should: 'return NaN',
    actual: Number.isNaN(restrictNumberByNeighbors(NaN, null, 100)),
    expected: true,
  });

  assert({
    given: 'number and nextNeighbor are falsey numbers',
    should: 'return NaN',
    actual: Number.isNaN(restrictNumberByNeighbors('', 0, 'twenty')),
    expected: true,
  });

  assert({
    given: 'incorrect arguments',
    should: 'return NaN',
    actual: Number.isNaN(restrictNumberByNeighbors(false, NaN, 'twenty')),
    expected: true,
  });
});
