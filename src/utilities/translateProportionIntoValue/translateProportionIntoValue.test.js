import { translateProportionIntoValue } from "./translateProportionIntoValue";
import { makeTestClass, template } from "../../../tests/testUtilities";

export function testTranslateProportionIntoValue() {
  describe("translateProportionIntoValue", () => {
    const describeTest = template`proportion of ${0} between ${1} is ${"expectation"}`;
    const TestClass = makeTestClass(translateProportionIntoValue, describeTest);

    describe("shall return value", () => {
      const funcOptions = [
        [20, [0, 500]],
        [0, [0, 500]],
        [100, [0, 500]],
        [95.7, [0, 1000]],
        [10, [200, 700]],
        [50, [-500, 500]],
        [30, [-500, 500]],
        [90, [-500, 0]],
        [50, [-500, -200]],
      ];
      const expectations = [100, 0, 500, 957, 250, 0, -200, -50, -350];
      const test = new TestClass();

      test.test(funcOptions, expectations);
    });

    describe("shall handle imprecise calculations", () => {
      const funcOptions = [
        [16.19048, [0, 105]],
        [33.33333, [0, 3]],
        [32.67327, [0, 101]],
        [83.80952, [-105, 0]],
        [33.33333, [-2, 1]],
      ];
      const expectations = [17, 1, 33, -17, -1];
      const test = new TestClass();

      test.test(funcOptions, expectations);
    });

    describe("shall handle out of range proportion (0 > proportion > 100)", () => {
      const funcOptions = [
        [101, [200, 700]],
        [200, [200, 700]],
        [-1, [200, 700]],
        [-100, [200, 700]],
      ];
      const expectations = [705, 1200, 195, -300];
      const test = new TestClass();

      test.test(funcOptions, expectations);
    });

    context("shall catch garbage input", () => {
      describe("returns NaN, if proportion parameter is incorrect", () => {
        const funcOptions = [
          [undefined, [-500, 500]],
          [null, [-500, 500]],
          [Infinity, [-500, 500]],
          [NaN, [-500, 500]],
          ["text", [-500, 500]],
          ["123text", [-500, 500]],
        ];
        const expectations = new Array(funcOptions.length).fill(NaN);
        const test = new TestClass();

        test.test(funcOptions, expectations);
      });

      describe("returns NaN, if range parameter is incorrect", () => {
        const funcOptions = [
          [50, [undefined, 500]],
          [50, [null, 500]],
          [50, [Infinity, 500]],
          [50, [NaN, 500]],
          [50, ["text", 500]],
          [50, ["123text", 500]],
        ];
        const expectations = new Array(funcOptions.length).fill(NaN);
        const test = new TestClass();

        test.test(funcOptions, expectations);
      });
    });
  });
}
