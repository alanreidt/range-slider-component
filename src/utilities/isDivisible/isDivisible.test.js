import { isDivisible } from "./isDivisible";
import { makeTestClass, template } from "../../../tests/testUtilities";

describe("isDivisible", () => {
  const describeTest = template`It is ${"expectation"} that ${0} is divisible by ${1}`;
  const TestClass = makeTestClass(isDivisible, describeTest);

  describe("shall return true, if dividend is divisible by divisor", () => {
    const funcOptions = [
      [200, 100],
      [0, 100],
      [-200, 100],
      [0, Infinity],
    ];
    const expectations = new Array(funcOptions.length).fill(true);
    const test = new TestClass();

    test.test(funcOptions, expectations);
  });

  describe("shall handle Infinity correctly", () => {
    const funcOptions = [
      [Infinity, 20],
      [Infinity, Infinity],
      [Infinity, -Infinity],
      [-Infinity, Infinity],
      [-Infinity, -Infinity],
    ];
    const expectations = new Array(funcOptions.length).fill(false);
    const test = new TestClass();

    test.test(funcOptions, expectations);
  });

  describe("shall catch garbage input", () => {
    context("returns NaN if dividend parameter is incorrect", () => {
      const funcOptions = [
        [undefined, 60],
        [null, 60],
        [Infinity, 60],
        [NaN, 60],
        ["text", 60],
        ["123text", 60],
      ];
      const expectations = new Array(funcOptions.length).fill(false);
      const test = new TestClass();

      test.test(funcOptions, expectations);
    });

    context("returns NaN if divisor parameter is incorrect", () => {
      const funcOptions = [
        [100, undefined],
        [100, null],
        [100, Infinity],
        [100, NaN],
        [100, "text"],
        [100, "123text"],
      ];
      const expectations = new Array(funcOptions.length).fill(false);
      const test = new TestClass();

      test.test(funcOptions, expectations);
    });
  });
});
