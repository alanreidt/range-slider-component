import findValuePositionBetween from './findValuePositionBetween';
import {
  makeTestClass,
  testDescriptionTemplate,
} from '../../../modules/testUtilities';

describe('findValuePositionBetween', () => {
  const commonDescriptionTemplate = testDescriptionTemplate`position of ${0} between ${1} and ${2} is ${'expectation'}`;
  const TestClass = makeTestClass(
    findValuePositionBetween,
    commonDescriptionTemplate,
  );

  describe('shall return position', () => {
    const funcArgsList = [
      [100, 0, 500],
      [0, 0, 500],
      [500, 0, 500],
      [957, 0, 1000],
      [250, 200, 700],
      [0, -500, 500],
      [-200, -500, 500],
      [-50, -500, 0],
      [-350, -500, -200],
    ];
    const expectations = [
      '20%',
      '0%',
      '100%',
      '95.7%',
      '10%',
      '50%',
      '30%',
      '90%',
      '50%',
    ];
    const test = new TestClass();

    test.run(funcArgsList, expectations);
  });

  context('shall handle exceptions', () => {
    describe('handle exceeded position (0% > position > 100%)', () => {
      const funcArgsList = [
        [100, 200, 700],
        [900, 200, 700],
        [300, -700, -200],
        [0, -700, -200],
      ];
      const expectations = ['-20%', '140%', '200%', '140%'];
      const test = new TestClass();

      test.run(funcArgsList, expectations);
    });

    describe('handle infinite end', () => {
      const funcArgsList = [[50, 500, Infinity]];
      const expectations = ['0%'];
      const test = new TestClass();

      test.run(funcArgsList, expectations);
    });
  });

  context('shall catch garbage input', () => {
    describe('returns NaN, if value parameter is incorrect', () => {
      const funcArgsList = [
        [undefined, -500, 500],
        [null, -500, 500],
        [Infinity, -500, 500],
        [NaN, -500, 500],
        ['text', -500, 500],
        ['123text', -500, 500],
      ];
      const expectations = new Array(funcArgsList.length).fill(NaN);
      const test = new TestClass();

      test.run(funcArgsList, expectations);
    });

    describe('returns NaN, if start parameter is incorrect', () => {
      const funcArgsList = [
        [50, undefined, 500],
        [50, null, 500],
        [50, Infinity, 500],
        [50, NaN, 500],
        [50, 'text', 500],
        [50, '123text', 500],
      ];
      const expectations = new Array(funcArgsList.length).fill(NaN);
      const test = new TestClass();

      test.run(funcArgsList, expectations);
    });

    describe('returns NaN, if end parameter is incorrect', () => {
      const funcArgsList = [
        [50, 500, undefined],
        [50, 500, null],
        [50, 500, NaN],
        [50, 500, 'text'],
        [50, 500, '123text'],
      ];
      const expectations = new Array(funcArgsList.length).fill(NaN);
      const test = new TestClass();

      test.run(funcArgsList, expectations);
    });
  });
});
