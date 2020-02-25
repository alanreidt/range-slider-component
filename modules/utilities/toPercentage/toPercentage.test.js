import toPercentage from './toPercentage';
import { makeTestClass, testDescriptionTemplate } from '../../testUtilities';

describe('toPercentage', () => {
  const commonDescriptionTemplate = testDescriptionTemplate`converts ${0} to ${'expectation'}`;
  const TestClass = makeTestClass(toPercentage, commonDescriptionTemplate);

  describe('shall convert number to percentages', () => {
    const funcArgsList = [[0], [2], [0.2], [0.75], [-2.5]];
    const expectations = ['0%', '200%', '20%', '75%', '-250%'];
    const test = new TestClass();

    test.run(funcArgsList, expectations);
  });

  context('shall catch garbage input', () => {
    describe('returns NaN, if number parameter is incorrect', () => {
      const funcArgsList = [
        [undefined],
        [null],
        [Infinity],
        [NaN],
        ['text'],
        ['123text'],
      ];
      const expectations = new Array(funcArgsList.length).fill(NaN);
      const test = new TestClass();

      test.run(funcArgsList, expectations);
    });
  });
});
