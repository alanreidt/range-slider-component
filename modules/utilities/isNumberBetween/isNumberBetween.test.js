import isNumberBetween from './isNumberBetween';
import {
  makeTestClass,
  testDescriptionTemplate,
} from '../../testUtilities';

describe('isNumberBetween', () => {
  const commonDescriptionTemplate = testDescriptionTemplate`It is ${'expectation'} that ${0} is between ${1} and ${2}`;
  const TestClass = makeTestClass(isNumberBetween, commonDescriptionTemplate);

  describe('shall return true, if number is between start and end', () => {
    const funcArgsList = [
      [50, 0, 100],
      [-50, -100, 0],
      [-250, -300, -100],
      [0, -300, 300],
      [0, -300, Infinity],
      [0, -Infinity, 300],
      [1000000000, -Infinity, Infinity],
    ];
    const expectations = new Array(funcArgsList.length).fill(true);
    const test = new TestClass();

    test.run(funcArgsList, expectations);
  });

  describe('shall return false, if number is not between start and end', () => {
    const funcArgsList = [
      [150, 0, 100],
      [-150, -100, 0],
      [-350, -300, -100],
      [-500, -300, 300],
      [-500, -300, Infinity],
      [500, -Infinity, 300],
    ];
    const expectations = new Array(funcArgsList.length).fill(false);
    const test = new TestClass();

    test.run(funcArgsList, expectations);
  });

  describe('shall handle input, when start is end and vice versa', () => {
    const funcArgsList = [
      [50, 100, 0],
      [-50, 0, -100],
      [-250, -100, -300],
      [0, 300, -300],
      [0, Infinity, -300],
      [0, 300, -Infinity],
      [1000000000, Infinity, -Infinity],
    ];
    const expectations = new Array(funcArgsList.length).fill(true);
    const test = new TestClass();

    test.run(funcArgsList, expectations);
  });

  describe('shall not include extremums', () => {
    const funcArgsList = [
      [100, 0, 100],
      [0, 0, 100],
      [300, -300, 300],
      [-300, -300, 300],
    ];
    const expectations = new Array(funcArgsList.length).fill(false);
    const test = new TestClass();

    test.run(funcArgsList, expectations);
  });

  describe('shall treat Infinity right', () => {
    const funcArgsList = [
      [Infinity, -300, Infinity],
      [-Infinity, -Infinity, 300],
      [Infinity, -Infinity, Infinity],
      [-Infinity, -Infinity, Infinity],
    ];
    const expectations = new Array(funcArgsList.length).fill(true);
    const test = new TestClass();

    test.run(funcArgsList, expectations);
  });

  describe('shall return false, if there is no number in between', () => {
    const funcArgsList = [
      [100, 100, 100],
      [100, 100, 101],
      [101, 100, 101],
      [-300, -300, -300],
      [-300, -301, -300],
      [-301, -301, -300],
    ];
    const expectations = new Array(funcArgsList.length).fill(false);
    const test = new TestClass();

    test.run(funcArgsList, expectations);
  });

  context('shall catch garbage input', () => {
    describe('returns false, if number is incorrect', () => {
      const funcArgsList = [
        [undefined, -100, 100],
        [null, -100, 100],
        [Infinity, -100, 100],
        [NaN, -100, 100],
        ['text', -100, 100],
        ['123text', -100, 100],
      ];
      const expectations = new Array(funcArgsList.length).fill(false);
      const test = new TestClass();

      test.run(funcArgsList, expectations);
    });

    describe('returns false, if start is incorrect', () => {
      const funcArgsList = [
        [50, undefined, 100],
        [50, null, 100],
        [50, NaN, 100],
        [50, 'text', 100],
        [50, '123text', 100],
      ];
      const expectations = new Array(funcArgsList.length).fill(false);
      const test = new TestClass();

      test.run(funcArgsList, expectations);
    });

    describe('returns false, if end is incorrect', () => {
      const funcArgsList = [
        [50, 100, undefined],
        [50, 100, null],
        [50, 100, NaN],
        [50, 100, 'text'],
        [50, 100, '123text'],
      ];
      const expectations = new Array(funcArgsList.length).fill(false);
      const test = new TestClass();

      test.run(funcArgsList, expectations);
    });
  });
});
