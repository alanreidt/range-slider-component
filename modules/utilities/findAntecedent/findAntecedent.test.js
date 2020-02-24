import findAntecedent from './findAntecedent';
import {
  makeTestClass,
  testDescriptionTemplate,
} from '../../testUtilities';

describe('findAntecedent', () => {
  const commonDescriptionTemplate = testDescriptionTemplate`antecedent of ${0} by ${1}, with offset = ${3} is ${'expectation'}`;
  const TestClass = makeTestClass(findAntecedent, commonDescriptionTemplate);

  describe('shall return antecedent', () => {
    const funcArgsList = [
      [500, 0.2],
      [500, 0],
      [500, 0.1, 200],
      [1000, 0.5, -500],
      [1000, 0.3, -500],
      [500, 0.9, -500],
      [300, 0.5, -500],
    ];
    const expectations = [100, 0, 250, 0, -200, -50, -350];
    const test = new TestClass();

    test.run(funcArgsList, expectations);
  });

  describe('shall handle exceptions', () => {
    const funcArgsList = [
      [500, -0.2, 200],
      [500, 1.4, 200],
      [500, 2, -700],
      [500, 1.4, -700],
      [300, 0, 300],
      [1000, Infinity, -500],
      [Infinity, 0.2, -500],
      [Infinity, 0, -500],
    ];
    const expectations = [100, 900, 300, 0, 300, Infinity, Infinity, NaN];
    const test = new TestClass();

    test.run(funcArgsList, expectations);
  });

  context('shall catch garbage input', () => {
    describe('returns NaN, if consequent parameter is incorrect', () => {
      const funcArgsList = [
        [undefined, 1, -500],
        [null, 1, -500],
        [NaN, 1, -500],
        ['text', 1, -500],
        ['123text', 1, -500],
      ];
      const expectations = new Array(funcArgsList.length).fill(NaN);
      const test = new TestClass();

      test.run(funcArgsList, expectations);
    });

    describe('returns NaN, if ratio parameter is incorrect', () => {
      const funcArgsList = [
        [100, undefined, -500],
        [100, null, -500],
        [100, NaN, -500],
        [100, 'text', -500],
        [100, '123text', -500],
      ];
      const expectations = new Array(funcArgsList.length).fill(NaN);
      const test = new TestClass();

      test.run(funcArgsList, expectations);
    });

    describe('returns NaN, if offset parameter is incorrect', () => {
      const funcArgsList = [
        [100, 200, null],
        [100, 200, NaN],
        [100, 200, Infinity],
        [100, 200, 'text'],
        [100, 200, '123text'],
      ];
      const expectations = new Array(funcArgsList.length).fill(NaN);
      const test = new TestClass();

      test.run(funcArgsList, expectations);
    });
  });
});
