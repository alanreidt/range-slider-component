import either from './either';
import {
  makeTestClass,
  testDescriptionTemplate,
} from '../../testUtilities';

describe('either', () => {
  const commonDescriptionTemplate = testDescriptionTemplate`return ${'expectation'} from ${0} and ${1}`;
  const TestClass = makeTestClass(either, commonDescriptionTemplate);

  describe("shall return fallback parameter, if origin isn't correct", () => {
    const funcArgsList = [
      [undefined, 500],
      [null, 500],
      [NaN, 500],
      [false, 500],
      ['', 500],
    ];
    const expectations = new Array(funcArgsList.length).fill(500);
    const test = new TestClass();

    test.run(funcArgsList, expectations);
  });

  describe("shall return origin, if it's correct", () => {
    const funcArgsList = [
      [100, 500],
      [0, 500],
      [-100, 500],
      [0.5, 500],
      [Infinity, 500],
      [-Infinity, 500],
    ];
    const expectations = [100, 0, -100, 0.5, Infinity, -Infinity];
    const test = new TestClass();

    test.run(funcArgsList, expectations);
  });

  describe('shall return fallback, if neither is true', () => {
    const funcArgsList = [
      [undefined, null],
      [null, undefined],
      [NaN, ''],
      [false, false],
      ['', NaN],
    ];
    const expectations = [null, undefined, '', false, NaN];
    const test = new TestClass();

    test.run(funcArgsList, expectations);
  });
});
