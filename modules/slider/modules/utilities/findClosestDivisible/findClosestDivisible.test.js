import findClosestDivisible from './findClosestDivisible';
import {
  makeTestClass,
  testDescriptionTemplate,
} from '../../testUtilities';

describe('findClosestDivisible', () => {
  const commonDescriptionTemplate = testDescriptionTemplate`closest divisible number for division of ${0} by ${1} is ${'expectation'}`;
  const TestClass = makeTestClass(
    findClosestDivisible,
    commonDescriptionTemplate,
  );

  describe('shall return closest divisible number', () => {
    const funcArgsList = [
      [220, 100],
      [250, 100],
      [280, 100],
      [30, 100],
      [60, 100],
      [-220, 100],
      [-250, 100],
      [-280, 100],
    ];
    const expectations = [200, 300, 300, 0, 100, -200, -200, -300];
    const test = new TestClass();

    test.run(funcArgsList, expectations);
  });

  describe("shall return NaN, if operation can't be performed", () => {
    const funcArgsList = [[200, 0], [], [200]];
    const expectations = new Array(funcArgsList.length).fill(NaN);
    const test = new TestClass();

    test.run(funcArgsList, expectations);
  });

  describe('shall correct negative divisor, removing sign', () => {
    const funcArgsList = [
      [220, -100],
      [250, -100],
      [280, -100],
      [0, -100],
      [-120, -100],
    ];
    const expectations = [200, 300, 300, 0, -100];
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
      const expectations = new Array(funcArgsList.length).fill(NaN);
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
      const expectations = new Array(funcArgsList.length).fill(NaN);
      const test = new TestClass();

      test.run(funcArgsList, expectations);
    });
  });
});
