import { toPercentage } from "./toPercentage";
import { makeTestClass, template } from "../../../tests/testUtilities";

describe("toPercentage", () => {
  const describeTest = template`converts ${0} to ${"expectation"}`;
  const TestClass = makeTestClass(toPercentage, describeTest);

  describe("shall convert number to percentages", () => {
    const funcOptions = [[0], [1], [2], [0.2], [0.75]];
    const expectations = ["0%", "100%", "200%", "20%", "75%"];
    const test = new TestClass();
    test.test(funcOptions, expectations);
  });

  describe("shall handle imprecise calculations", () => {
    const funcOptions = [[0.1619048], [0.3333333], [0.957]];
    const expectations = ["16.19048%", "33.33333%", "95.70000%"];
    const test = new TestClass();
    test.test(funcOptions, expectations);
  });

  context("shall catch garbage input", () => {
    describe("returns NaN, if number parameter is incorrect", () => {
      const funcOptions = [
        [undefined],
        [null],
        [Infinity],
        [NaN],
        ["text"],
        ["123text"],
      ];
      const expectations = new Array(funcOptions.length).fill(NaN);
      const test = new TestClass();
      test.test(funcOptions, expectations);
    });
  });
});
