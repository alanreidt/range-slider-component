import isDivisible from './isDivisible';
import {
  makeTestClass,
  testDescriptionTemplate,
} from '../../testUtilities';

describe('isDivisible', () => {
  const commonDescriptionTemplate = testDescriptionTemplate`It is ${'expectation'} that ${0} is divisible by ${1}`;
  const TestClass = makeTestClass(isDivisible, commonDescriptionTemplate);

  describe('shall return true, if dividend is divisible by divisor', () => {
    const funcArgsList = [
      [200, 100],
      [0, 100],
      [-200, 100],
      [0, Infinity],
    ];
    const expectations = new Array(funcArgsList.length).fill(true);
    const test = new TestClass();

    test.run(funcArgsList, expectations);
  });

  describe('shall handle Infinity correctly', () => {
    const funcArgsList = [
      [Infinity, 20],
      [Infinity, Infinity],
      [Infinity, -Infinity],
      [-Infinity, Infinity],
      [-Infinity, -Infinity],
    ];
    const expectations = new Array(funcArgsList.length).fill(false);
    const test = new TestClass();

    test.run(funcArgsList, expectations);
  });

  describe('shall catch garbage input', () => {
    context('returns NaN if dividend parameter is incorrect', () => {
      const funcArgsList = [
        [undefined, 60],
        [null, 60],
        [Infinity, 60],
        [NaN, 60],
        ['text', 60],
        ['123text', 60],
      ];
      const expectations = new Array(funcArgsList.length).fill(false);
      const test = new TestClass();

      test.run(funcArgsList, expectations);
    });

    context('returns NaN if divisor parameter is incorrect', () => {
      const funcArgsList = [
        [100, undefined],
        [100, null],
        [100, Infinity],
        [100, NaN],
        [100, 'text'],
        [100, '123text'],
      ];
      const expectations = new Array(funcArgsList.length).fill(false);
      const test = new TestClass();

      test.run(funcArgsList, expectations);
    });
  });
});
